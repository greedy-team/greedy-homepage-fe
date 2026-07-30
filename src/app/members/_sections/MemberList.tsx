"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChip } from "@/shared/ui/FilterChip";
import { cn, focusRing } from "@/shared/lib/cn";
import { formatAffiliation, formatMemberRole, getAvatarUrl, roleAt } from "@/entities/member/lib";
import type { ExternalReviewer, MemberRole, MemberSummary } from "@/entities/member/model";
import { ALL, EMPTY, ROLE_FILTERS } from "./content";

type MemberListProps = {
  members: MemberSummary[];
  externalReviewers: ExternalReviewer[];
  cohorts: number[];
};

type RoleFilter = (typeof ROLE_FILTERS)[number];

/** 역할 필터 버킷. 창립·리드는 운영진에, 든든한 리뷰어도 내부 리뷰어와 같은 REVIEWER라 리뷰어에 묶여요(ADR009) */
function matchesRoleFilter(role: MemberRole, filter: RoleFilter | null): boolean {
  if (filter === null) return true;
  if (filter === "운영진") return role === "MAINTAINER" || role === "STUDY_LEAD" || role === "CO_FOUNDER";
  if (filter === "리뷰어") return role === "REVIEWER";
  return role === "STUDY_MEMBER";
}

/** 카드 정렬 순서: 이끄는 사람 → 돕는 사람 → 배우는 사람 */
const ROLE_ORDER: Record<MemberRole, number> = {
  CO_FOUNDER: 0,
  MAINTAINER: 0,
  STUDY_LEAD: 1,
  REVIEWER: 2,
  STUDY_MEMBER: 3,
};

/** 화면에 그릴 카드 하나. 내부 멤버와 든든한 리뷰어를 같은 모양으로 맞춰요 */
type MemberCard = {
  key: string;
  href: string;
  name: string;
  affiliation?: string;
  badge: string;
  avatarSrc?: string;
  githubUrl?: string;
  order: number;
};

/**
 * memberActions 기반으로 카드 하나를 만들어요. 내부 멤버든 든든한 리뷰어든 모양(memberActions)이
 * 같아서 같은 함수로 처리해요 — 기수/역할 필터도 자연히 같은 규칙으로 적용돼요.
 * badgeOverride는 든든한 리뷰어 배지("든든한 리뷰어")처럼 라벨만 다르게 보여줄 때 써요.
 */
function buildCard(
  person: { id: number; name: string; githubUrl?: string; memberActions: MemberSummary["memberActions"] },
  hrefBase: string,
  cohort: number | null,
  roleFilter: RoleFilter | null,
  badgeOverride?: string,
): MemberCard | null {
  if (cohort !== null && !person.memberActions.some((action) => action.generationNumber === cohort)) {
    return null;
  }
  const role = roleAt(person, cohort);
  if (!role || !matchesRoleFilter(role, roleFilter)) return null;

  return {
    key: `${hrefBase}-${person.id}`,
    href: `${hrefBase}/${person.id}`,
    name: person.name,
    affiliation: formatAffiliation(person),
    badge: badgeOverride ?? formatMemberRole(role),
    avatarSrc: getAvatarUrl(person),
    githubUrl: person.githubUrl,
    order: ROLE_ORDER[role],
  };
}

/** 기수·역할 필터로 거른 멤버 카드 그리드. 두 필터는 같은 시점 기준으로 함께 적용돼요. */
export function MemberList({ members, externalReviewers, cohorts }: MemberListProps) {
  const [cohort, setCohort] = useState<number | null>(null);
  const [role, setRole] = useState<RoleFilter | null>(null);

  const memberCards = members
    .map((member) => buildCard(member, "/members", cohort, role))
    .filter((card): card is MemberCard => card !== null);

  const externalCards = externalReviewers
    .map((reviewer) => buildCard(reviewer, "/members/external", cohort, role, "든든한 리뷰어"))
    .filter((card): card is MemberCard => card !== null);

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
          {cards.map((card) => (
            <li key={card.key}>
              <Link href={card.href} className={cn("block h-full rounded-lg", focusRing)}>
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
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={EMPTY.title} description={EMPTY.description} />
      )}
    </div>
  );
}
