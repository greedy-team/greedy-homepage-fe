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
  MEMBER_ROLE_ORDER,
  formatAffiliation,
  formatMemberBadge,
  getAvatarUrl,
  latestGeneration,
  roleAt,
  rolesAt,
} from "@/entities/member/lib";
import type { MemberSummary, ResolvedMemberRole } from "@/entities/member/model";
import { ALL, EMPTY, ROLE_FILTERS } from "./content";

type MemberListProps = {
  members: MemberSummary[];
  cohorts: number[];
};

type RoleFilter = (typeof ROLE_FILTERS)[number];

/**
 * 내부·외부 역할을 현재 역할 필터 버킷에 매핑해요. 외부 리뷰어는 리뷰어 필터에 포함돼요.
 * 한 기수에 역할을 겸했으면(예: 운영진 + 리뷰어) 그중 하나만 맞아도 걸려요 —
 * 배지에는 이끄는 역할 하나만 보이지만, 필터는 겸한 역할 전부를 봐요.
 */
function matchesRoleFilter(roles: ResolvedMemberRole[], filter: RoleFilter | null): boolean {
  if (filter === null) return true;
  if (filter === "운영진") {
    return roles.some((role) => role === "MAINTAINER" || role === "STUDY_LEAD" || role === "CO_FOUNDER");
  }
  if (filter === "리뷰어") return roles.some((role) => role === "REVIEWER");
  return roles.some((role) => role === "STUDY_MEMBER");
}

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
  const roles = rolesAt(person, cohort);
  const role = roleAt(person, cohort);
  if (!role || !matchesRoleFilter(roles, roleFilter)) return null;

  return {
    key: String(person.id),
    href: `/members/${person.id}`,
    name: person.name,
    affiliation: formatAffiliation(person),
    badge: formatMemberBadge(person, role, cohort),
    avatarSrc: getAvatarUrl(person),
    order: MEMBER_ROLE_ORDER[role],
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
