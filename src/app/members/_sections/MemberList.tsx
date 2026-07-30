"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChip } from "@/shared/ui/FilterChip";
import { cn, focusRing } from "@/shared/lib/cn";
import {
  formatAffiliation,
  formatMemberRole,
  formatStackPosition,
  getAvatarUrl,
  roleAt,
} from "@/entities/member/lib";
import type { ExternalReviewer, MemberRole, MemberSummary } from "@/entities/member/model";
import { ALL, EMPTY, ROLE_FILTERS } from "./content";

type MemberListProps = {
  members: MemberSummary[];
  externalReviewers: ExternalReviewer[];
  cohorts: number[];
};

type RoleFilter = (typeof ROLE_FILTERS)[number];

/** 역할 필터 버킷. 창립·리드는 운영진에, 든든한 리뷰어는 리뷰어에 묶여요(ADR009) */
function matchesRoleFilter(role: MemberRole, filter: RoleFilter | null): boolean {
  if (filter === null) return true;
  if (filter === "운영진") return role === "MAINTAINER" || role === "STUDY_LEAD" || role === "CO_FOUNDER";
  if (filter === "리뷰어") return role === "REVIEWER";
  return role === "STUDY_MEMBER";
}

/** 카드 정렬 순서: 이끄는 사람 → 돕는 사람 → 배우는 사람. 든든한 리뷰어는 맨 뒤예요 */
const ROLE_ORDER: Record<MemberRole, number> = {
  CO_FOUNDER: 0,
  MAINTAINER: 0,
  STUDY_LEAD: 1,
  REVIEWER: 2,
  STUDY_MEMBER: 3,
};
const EXTERNAL_REVIEWER_ORDER = 4;

/** 화면에 그릴 카드 하나. 내부 멤버와 든든한 리뷰어를 같은 모양으로 맞춰요 */
type MemberCard = {
  key: string;
  href?: string;
  name: string;
  affiliation?: string;
  badge: string;
  avatarSrc?: string;
  githubUrl?: string;
  order: number;
};

/**
 * 기수·역할 필터로 거른 멤버 카드 그리드. 두 필터는 같은 시점 기준으로 함께 적용돼요.
 * 든든한 리뷰어(외부)는 기수 정보가 없어서, 기수 필터가 "전체"일 때만 같이 보여요.
 */
export function MemberList({ members, externalReviewers, cohorts }: MemberListProps) {
  const [cohort, setCohort] = useState<number | null>(null);
  const [role, setRole] = useState<RoleFilter | null>(null);

  const memberCards: MemberCard[] = members.flatMap((member) => {
    if (cohort !== null && !member.memberActions.some((action) => action.generationNumber === cohort)) {
      return [];
    }
    const memberRole = roleAt(member, cohort);
    if (!memberRole || !matchesRoleFilter(memberRole, role)) return [];

    return [
      {
        key: `member-${member.id}`,
        href: `/members/${member.id}`,
        name: member.name,
        affiliation: formatAffiliation(member),
        badge: formatMemberRole(memberRole),
        avatarSrc: getAvatarUrl(member),
        githubUrl: member.githubUrl,
        order: ROLE_ORDER[memberRole],
      },
    ];
  });

  const showExternalReviewers = cohort === null && (role === null || role === "리뷰어");
  const externalCards: MemberCard[] = showExternalReviewers
    ? externalReviewers.map((reviewer) => ({
        key: `external-${reviewer.id}`,
        href: `/members/external/${reviewer.id}`,
        name: reviewer.name,
        affiliation: formatStackPosition(reviewer.stackPosition),
        badge: "든든한 리뷰어",
        avatarSrc: getAvatarUrl(reviewer),
        githubUrl: reviewer.githubUrl,
        order: EXTERNAL_REVIEWER_ORDER,
      }))
    : [];

  const cards = [...memberCards, ...externalCards].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip selected={cohort === null} onClick={() => setCohort(null)}>
            {ALL}
          </FilterChip>
          {cohorts.map((item) => (
            <FilterChip key={item} selected={cohort === item} onClick={() => setCohort(item)}>
              {item}기
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip selected={role === null} onClick={() => setRole(null)}>
            {ALL}
          </FilterChip>
          {ROLE_FILTERS.map((item) => (
            <FilterChip key={item} selected={role === item} onClick={() => setRole(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
      </div>

      {cards.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {cards.map((card) => {
            const body = (
              <Card className="flex h-full flex-col items-center gap-3 text-center transition-colors hover:border-gray-300">
                <Avatar name={card.name} src={card.avatarSrc} size="lg" />
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-h3 text-text">{card.name}</h2>
                  {card.affiliation && (
                    <p className="text-body-sm text-text-subtle">{card.affiliation}</p>
                  )}
                </div>
                <Badge variant={card.badge === "운영진" ? "brand" : "outline"}>{card.badge}</Badge>
                {card.githubUrl && <span className="text-caption text-text-subtle">GitHub</span>}
              </Card>
            );
            return (
              <li key={card.key}>
                {card.href ? (
                  <Link href={card.href} className={cn("block h-full rounded-lg", focusRing)}>
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState title={EMPTY.title} description={EMPTY.description} />
      )}
    </div>
  );
}
