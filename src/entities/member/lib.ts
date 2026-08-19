// memberActions(기수별 활동 기록) 배열 하나에서, 소속 문구/역할 배지/아바타를 파생시켜요.
// 카드에 보이는 두 축(소속 문구는 고정, 역할 배지는 기수 필터에 따라 바뀜)이 이 파일의 핵심이에요.
// 화면 설계 의도는 docs/adr/009-멤버-페이지-구성.md, 파생 규칙 자체는 docs/adr/012-멤버-파생-로직.md 참고.
import { CURRENT_GENERATION } from "@/shared/config/site";
import type { MemberAction, ResolvedMemberRole, StackPosition } from "./model";

/** memberActions만 있으면 되는 함수들이 MemberSummary/Member 둘 다 받을 수 있게 구조적 타입으로 받아요 */
type HasMemberActions = { memberActions: MemberAction[] };

/** 기수가 있는(null이 아닌) 활동 기록 하나 */
type GenerationAction = MemberAction & { generationNumber: number };

const STACK_POSITION_LABEL: Record<StackPosition, string> = {
  FRONTEND: "FE",
  BACKEND: "BE",
  DESIGN: "디자이너",
};

/** 스택 배지에 쓰는 라벨. project 도메인의 같은 이름 함수와 로직이 같지만, entity끼리는 참조하지 않아서 따로 둬요 */
export function formatStackPosition(position: StackPosition): string {
  return STACK_POSITION_LABEL[position];
}

const MEMBER_ROLE_LABEL: Record<ResolvedMemberRole, string> = {
  CO_FOUNDER: "운영진",
  MAINTAINER: "운영진",
  STUDY_LEAD: "스터디 리드",
  STUDY_MEMBER: "멤버",
  REVIEWER: "리뷰어",
  PROJECT_MEMBER: "외부 프로젝트 멤버",
};

/** 역할 배지 라벨. CO_FOUNDER도 배지는 다른 운영진과 같아요("창립 멤버"는 소속 문구 쪽 몫이에요) */
export function formatMemberRole(role: ResolvedMemberRole): string {
  return MEMBER_ROLE_LABEL[role];
}

/** 보고 있는 기수의 활동 기록에 외부 역할이 있으면 외부 멤버예요. */
export function isExternalMember(member: HasMemberActions, generationNumber: number | null = null): boolean {
  const action =
    generationNumber === null
      ? latestGenerationAction(member) ?? member.memberActions[0]
      : member.memberActions.find((item) => item.generationNumber === generationNumber);
  return action?.externalMemberRole != null;
}

/** 이 사람의 memberActions에 창립 기록이 있는지 */
export function isFounder(member: HasMemberActions): boolean {
  return member.memberActions.some((action) => action.memberRole === "CO_FOUNDER");
}

/** 기수가 있는 기록 중 가장 최신 것. 창립처럼 기수 없는 기록은 제외해요 (전체보기용)*/
function latestGenerationAction(member: HasMemberActions): GenerationAction | undefined {
  let latest: GenerationAction | undefined;
  for (const action of member.memberActions) {
    if (action.generationNumber === null) continue;
    // 바로 위에서 null을 걸렀으니, 여기서부터는 항상 기수가 있는 기록이에요
    if (!latest || action.generationNumber > latest.generationNumber) {
      latest = action as GenerationAction;
    }
  }
  return latest;
}

/** 최신 기수 번호. 창립만 있어 기수 기록이 없으면 undefined예요(목록 정렬 등에 써요) */
export function latestGeneration(member: HasMemberActions): number | undefined {
  return latestGenerationAction(member)?.generationNumber;
}

/** 기수가 있는 기록 중 가장 이른 것. 그 사람이 그리디에 들어온 시점이에요 */
function firstGeneration(member: HasMemberActions): number | undefined {
  let first: number | undefined;
  for (const action of member.memberActions) {
    if (action.generationNumber === null) continue;
    if (first === undefined || action.generationNumber < first) first = action.generationNumber;
  }
  return first;
}

/** 그 기수 활동 중 트랙 정보가 있는 기록의 스택이에요. 운영진 기록처럼 null인 값은 건너뛰어요. */
function stackPositionAt(member: HasMemberActions, generation: number): StackPosition | undefined {
  return member.memberActions.find(
    (action) => action.generationNumber === generation && action.stackPosition !== null,
  )?.stackPosition ?? undefined;
}

/**
 * 카드 상단의 소속 문구 (예: "2기 FE"). 들어온 기수 기준이고, 기수 필터와 무관하게 고정이에요.
 * 소속은 "언제 들어왔나", 역할 배지는 "지금 무엇을 하나"로 축이 나뉘어요(ADR009).
 * 창립 멤버 기록이 있으면 기수 대신 "창립 멤버"를 보여줘요.
 * 든든한 리뷰어(외부)는 들어온 기수라는 게 없어서 트랙 약어만 보여줘요(ADR009).
 */
export function formatAffiliation(member: HasMemberActions): string | undefined {
  if (isFounder(member)) return "창립 멤버";

  if (isExternalMember(member)) {
    const generation = latestGeneration(member);
    const stackPosition = generation === undefined ? undefined : stackPositionAt(member, generation);
    return stackPosition ? formatStackPosition(stackPosition) : undefined;
  }

  const generation = firstGeneration(member);
  if (generation === undefined) return undefined;

  const stackPosition = stackPositionAt(member, generation);
  return stackPosition ? `${generation}기 ${formatStackPosition(stackPosition)}` : `${generation}기`;
}

/**
 * 역할 배지. generationNumber가 null이면 "전체" 탭, 아니면 그 기수 시점 역할이에요.
 * "전체"는 항상 지금(CURRENT_GENERATION) 시점 기준이에요 — 지나간 최고 역할이 아니라
 * 지금 뭘 하고 있는지를 보여줘요. 지금 기록이 없으면 창립 멤버는 "운영진", 나머지는 "멤버"로 내려요.
 * 배지 텍스트로 바꾸려면 formatMemberRole을 같이 써요.
 */
export function roleAt(member: HasMemberActions, generationNumber: number | null): ResolvedMemberRole | undefined {
  if (generationNumber !== null) {
    const action = member.memberActions.find((item) => item.generationNumber === generationNumber);
    return action?.memberRole ?? action?.externalMemberRole ?? undefined;
  }

  const current = member.memberActions.find((item) => item.generationNumber === CURRENT_GENERATION);
  if (current) return current.memberRole ?? current.externalMemberRole ?? undefined;
  return isFounder(member) ? "CO_FOUNDER" : "STUDY_MEMBER";
}

/** 역할 배지 문구. 외부 리뷰어는 내부 리뷰어와 구분해 보여줘요. */
export function formatMemberBadge(
  member: HasMemberActions,
  role: ResolvedMemberRole,
  generationNumber: number | null = null,
): string {
  if (isExternalMember(member, generationNumber) && role === "REVIEWER") return "든든한 리뷰어";
  return formatMemberRole(role);
}

/** 활동 이력 카드 한 장 분량. 한 기수에 역할을 겸했으면 roles에 함께 담겨요 */
export type GenerationHistory = {
  /** 창립처럼 기수 개념이 없는 기록은 null이에요 */
  generationNumber: number | null;
  roles: ResolvedMemberRole[];
};

/** 이력 카드 안에서 역할을 늘어놓는 순서. 이끄는 쪽이 앞이에요(ADR009의 역할 우선순위) */
export const MEMBER_ROLE_ORDER: Record<ResolvedMemberRole, number> = {
  CO_FOUNDER: 0,
  MAINTAINER: 0,
  STUDY_LEAD: 1,
  REVIEWER: 2,
  STUDY_MEMBER: 3,
  PROJECT_MEMBER: 3,
};

/**
 * 활동 이력을 기수별로 한 장씩 묶어요. 서버는 한 기수의 겸직을 여러 건으로 주는데,
 * 화면에서는 "4기 · 운영진 · 스터디 리드"처럼 한 줄로 보여줘요.
 * 최신 기수가 위로 오고, 기수가 없는 창립 기록은 맨 아래예요.
 */
export function groupHistoryByGeneration(member: HasMemberActions): GenerationHistory[] {
  const byGeneration = new Map<number | null, ResolvedMemberRole[]>();
  for (const action of member.memberActions) {
    const role = action.memberRole ?? action.externalMemberRole;
    if (!role) continue;
    const roles = byGeneration.get(action.generationNumber) ?? [];
    if (!roles.includes(role)) roles.push(role);
    byGeneration.set(action.generationNumber, roles);
  }

  return [...byGeneration]
    .map(([generationNumber, roles]) => ({
      generationNumber,
      roles: [...roles].sort((a, b) => MEMBER_ROLE_ORDER[a] - MEMBER_ROLE_ORDER[b]),
    }))
    // 창립(기수 없음)은 1기보다도 앞선 기록이라 맨 아래에 둬요
    .sort((a, b) => (b.generationNumber ?? -1) - (a.generationNumber ?? -1));
}

/** 프로필 사진 주소. 깃허브 주소에서 아바타를 가져와요(ADR009) */
export function getAvatarUrl(person: { githubUrl?: string }): string | undefined {
  if (!person.githubUrl) return undefined;
  const username = person.githubUrl.replace(/\/$/, "").split("/").pop();
  return username ? `https://github.com/${username}.png` : undefined;
}
