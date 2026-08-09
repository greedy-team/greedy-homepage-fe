// memberActions(기수별 활동 기록) 배열 하나에서, 소속 문구/역할 배지/아바타를 파생시켜요.
// 카드에 보이는 두 축(소속 문구는 고정, 역할 배지는 기수 필터에 따라 바뀜)이 이 파일의 핵심이에요.
// 자세한 규칙은 docs/adr/009-멤버-페이지-구성.md 참고.
import type { MemberAction, MemberRole, StackPosition } from "./model";

/** memberActions만 있으면 되는 함수들이 MemberSummary/Member 둘 다 받을 수 있게 구조적 타입으로 받아요 */
type HasMemberActions = { memberActions: MemberAction[]; isExternal?: boolean };

const STACK_POSITION_LABEL: Record<StackPosition, string> = {
  FRONTEND: "FE",
  BACKEND: "BE",
  DESIGN: "디자이너",
};

/** 스택 배지에 쓰는 라벨. project 도메인의 같은 이름 함수와 로직이 같지만, entity끼리는 참조하지 않아서 따로 둬요 */
export function formatStackPosition(position: StackPosition): string {
  return STACK_POSITION_LABEL[position];
}

const MEMBER_ROLE_LABEL: Record<MemberRole, string> = {
  CO_FOUNDER: "운영진",
  MAINTAINER: "운영진",
  STUDY_LEAD: "스터디 리드",
  STUDY_MEMBER: "멤버",
  REVIEWER: "리뷰어",
};

/** 역할 배지 라벨. CO_FOUNDER도 배지는 다른 운영진과 같아요("창립 멤버"는 소속 문구 쪽 몫이에요) */
export function formatMemberRole(role: MemberRole): string {
  return MEMBER_ROLE_LABEL[role];
}

/** 이 사람의 memberActions에 창립 기록이 있는지 */
export function isFounder(member: HasMemberActions): boolean {
  return member.memberActions.some((action) => action.memberRole === "CO_FOUNDER");
}

/** 기수가 있는 기록 중 가장 최신 것. 창립처럼 기수 없는 기록은 제외해요 (전체보기용)*/
function latestGenerationAction(
  member: HasMemberActions,
): (MemberAction & { generationNumber: number }) | undefined {
  const withGeneration = member.memberActions.filter(
    (action): action is MemberAction & { generationNumber: number } => action.generationNumber !== null,
  );
  return withGeneration.sort((a, b) => b.generationNumber - a.generationNumber)[0];
}

/**
 * 카드 상단의 소속 문구 (예: "4기 BE"). 항상 최신 기수 기준이고, 기수 필터와 무관하게 고정이에요.
 * 창립 멤버 기록이 있으면 기수 대신 "창립 멤버"를 보여줘요.
 * 든든한 리뷰어(외부)는 기수를 노출하지 않고 트랙 약어만 보여줘요(ADR009).
 */
export function formatAffiliation(member: HasMemberActions): string | undefined {
  if (isFounder(member)) return "창립 멤버";

  const action = latestGenerationAction(member);
  if (!action) return undefined;
  if (member.isExternal) return formatStackPosition(action.stackPosition);
  return `${action.generationNumber}기 ${formatStackPosition(action.stackPosition)}`;
}

/**
 * 역할 배지. generationNumber가 null이면 "전체" 탭(최신 역할), 아니면 그 기수 시점 역할이에요.
 * 배지 텍스트로 바꾸려면 formatMemberRole을 같이 써요.
 */
export function roleAt(member: HasMemberActions, generationNumber: number | null): MemberRole | undefined {
  if (generationNumber !== null) {
    return member.memberActions.find((action) => action.generationNumber === generationNumber)
      ?.memberRole;
  }
  return latestGenerationAction(member)?.memberRole ?? member.memberActions[0]?.memberRole;
}

/** 역할 배지 문구. 든든한 리뷰어(외부)는 역할과 무관하게 "든든한 리뷰어"로 고정해요 */
export function formatMemberBadge(member: HasMemberActions, role: MemberRole): string {
  return member.isExternal ? "든든한 리뷰어" : formatMemberRole(role);
}

/** 프로필 사진 주소. 백엔드가 사진을 안 줘서 깃허브 아바타로 대신해요(ADR009) */
export function getAvatarUrl(person: { githubUrl?: string }): string | undefined {
  if (!person.githubUrl) return undefined;
  const username = person.githubUrl.replace(/\/$/, "").split("/").pop();
  return username ? `https://github.com/${username}.png` : undefined;
}
