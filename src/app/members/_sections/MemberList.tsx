"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChip } from "@/shared/ui/FilterChip";
import { cn, focusRing } from "@/shared/lib/cn";
import type { Member } from "@/entities/member/model";
import { ALL, EMPTY, ROLE_FILTERS } from "./content";

type MemberListProps = {
  members: Member[];
  cohorts: string[];
};

/**
 * 배지는 보고 있는 시점의 역할이에요. 전체는 지금 역할,
 * 기수를 고르면 그 기수 당시 역할(회장·운영진 > 리드 > 리뷰어 > 멤버)로 바뀌어요.
 */
function roleAt(member: Member, cohort: string): string | undefined {
  if (cohort === ALL) return member.role;
  const record = member.history.find((item) => item.cohort === cohort);
  if (!record) return undefined;
  if (member.role === "든든한 리뷰어") return "든든한 리뷰어";
  if (record.title.includes("회장") || record.title.includes("운영진")) return "운영진";
  if (record.title.includes("리드")) return "리드";
  if (record.title.includes("리뷰어")) return "리뷰어";
  return "멤버";
}

/** 그 시점의 트랙. 기수를 고르면 그 기수에 맡은 트랙으로만 걸러요 */
function tracksAt(member: Member, cohort: string): string[] {
  if (cohort === ALL) return member.tracks;
  const title = member.history.find((item) => item.cohort === cohort)?.title ?? "";
  const tracks: string[] = [];
  if (title.includes("프론트엔드")) tracks.push("FE");
  if (title.includes("백엔드")) tracks.push("BE");
  return tracks;
}

function matchesRole(member: Member, cohort: string, filter: string) {
  if (filter === ALL) return true;
  if (filter === "FE" || filter === "BE") return tracksAt(member, cohort).includes(filter);
  const role = roleAt(member, cohort);
  if (filter === "리뷰어") return role === "리뷰어" || role === "든든한 리뷰어";
  return role === filter;
}

function badgeVariant(role: string) {
  return role === "운영진" ? ("brand" as const) : ("outline" as const);
}

/** 어느 탭에서든 같은 순서: 이끄는 사람 → 돕는 사람 → 배우는 사람 */
const ROLE_ORDER: Record<string, number> = {
  운영진: 0,
  리드: 1,
  리뷰어: 2,
  멤버: 3,
  "든든한 리뷰어": 4,
};

/**
 * 기수·역할 필터로 거른 멤버 카드 그리드. 두 필터는 같은 시점 기준으로 함께 적용돼요.
 * 창립 멤버는 기수 이력이 없으면 전체에서만 보여요.
 */
export function MemberList({ members, cohorts }: MemberListProps) {
  const [cohort, setCohort] = useState<string>(ALL);
  const [role, setRole] = useState<string>(ALL);

  const filtered = members
    .filter(
      (member) =>
        (cohort === ALL || member.cohorts.includes(cohort)) && matchesRole(member, cohort, role),
    )
    // 보고 있는 시점의 역할 순서로 정렬해요. 같은 역할끼리는 명단 순서를 유지해요
    .sort(
      (a, b) =>
        (ROLE_ORDER[roleAt(a, cohort) ?? "멤버"] ?? 9) -
        (ROLE_ORDER[roleAt(b, cohort) ?? "멤버"] ?? 9),
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip selected={cohort === ALL} onClick={() => setCohort(ALL)}>
            {ALL}
          </FilterChip>
          {cohorts.map((item) => (
            <FilterChip key={item} selected={cohort === item} onClick={() => setCohort(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip selected={role === ALL} onClick={() => setRole(ALL)}>
            {ALL}
          </FilterChip>
          {ROLE_FILTERS.map((item) => (
            <FilterChip key={item} selected={role === item} onClick={() => setRole(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {filtered.map((member) => {
            const displayRole = roleAt(member, cohort) ?? member.role;
            return (
              <li key={member.id}>
                <Link
                  href={`/members/${member.id}`}
                  className={cn("block h-full rounded-lg", focusRing)}
                >
                  <Card className="flex h-full flex-col items-center gap-3 text-center transition-colors hover:border-gray-300">
                    <Avatar name={member.name} src={member.photoUrl} size="lg" />
                    <div className="flex flex-col items-center gap-1">
                      <h2 className="text-h3 text-text">{member.name}</h2>
                      <p className="text-body-sm text-text-subtle">{member.affiliation}</p>
                    </div>
                    <Badge variant={badgeVariant(displayRole)}>{displayRole}</Badge>
                    {member.githubUrl && (
                      <span className="text-caption text-text-subtle">GitHub</span>
                    )}
                  </Card>
                </Link>
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
