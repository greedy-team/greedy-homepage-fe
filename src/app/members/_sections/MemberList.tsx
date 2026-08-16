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
  formatMemberBadge,
  getAvatarUrl,
  latestGeneration,
  roleAt,
} from "@/entities/member/lib";
import type { MemberRole, MemberSummary } from "@/entities/member/model";
import { ALL, EMPTY, ROLE_FILTERS } from "./content";

type MemberListProps = {
  members: MemberSummary[];
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

/** 카드 정렬 1순위: 이끄는 사람 → 돕는 사람 → 배우는 사람. 든든한 리뷰어는 맨 뒤예요. 같은 순위 안에서는 최신 기수가 먼저예요(latestGeneration) */
const ROLE_ORDER: Record<MemberRole, number> = {
  CO_FOUNDER: 0,
  MAINTAINER: 0,
  STUDY_LEAD: 1,
  REVIEWER: 2,
  STUDY_MEMBER: 3,
};
const EXTERNAL_REVIEWER_ORDER = 4;

/** 화면에 그릴 카드 하나 */
type MemberCard = {
  key: string;
  href: string;
  name: string;
  affiliation?: string;
  badge: string;
  avatarSrc?: string;
  order: number;
  generation: number;
};

/** 역할 순위(order)가 먼저고, 같은 순위면 최신 기수(generation)가 앞이에요 */
function compareCards(a: MemberCard, b: MemberCard): number {
  if (a.order !== b.order) return a.order - b.order;
  return b.generation - a.generation;
}

/** memberActions 기반으로 카드 하나를 만들어요 */
function buildCard(person: MemberSummary, cohort: number | null, roleFilter: RoleFilter | null): MemberCard | null {
  if (cohort !== null && !person.memberActions.some((action) => action.generationNumber === cohort)) {
    return null;
  }
  const role = roleAt(person, cohort);
  if (!role || !matchesRoleFilter(role, roleFilter)) return null;

  return {
    key: String(person.id),
    href: `/members/${person.id}`,
    name: person.name,
    affiliation: formatAffiliation(person),
    badge: formatMemberBadge(person, role),
    avatarSrc: getAvatarUrl(person),
    order: person.isExternal ? EXTERNAL_REVIEWER_ORDER : ROLE_ORDER[role],
    generation: latestGeneration(person) ?? 0,
  };
}

/** 기수·역할 필터로 거른 멤버 카드 그리드. 두 필터는 같은 시점 기준으로 함께 적용돼요. */
export function MemberList({ members, cohorts }: MemberListProps) {
  const [cohort, setCohort] = useState<number | null>(null);
  const [role, setRole] = useState<RoleFilter | null>(null);

  const cards = members
    .map((member) => buildCard(member, cohort, role))
    .filter((card): card is MemberCard => card !== null)
    .sort(compareCards);

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
