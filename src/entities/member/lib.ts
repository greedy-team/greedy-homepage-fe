// memberActions(기수별 활동 기록) 배열 하나에서, 소속 문구/역할 배지/아바타를 파생시켜요.
// 카드에 보이는 두 축(소속 문구는 고정, 역할 배지는 기수 필터에 따라 바뀜)이 이 파일의 핵심이에요.
// 화면 설계 의도는 docs/adr/009-멤버-페이지-구성.md, 파생 규칙 자체는 docs/adr/012-멤버-파생-로직.md 참고.
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

/** 최신 기수 활동 중 트랙 정보가 있는 기록의 스택이에요. 운영진 기록처럼 null인 값은 건너뛰어요. */
function latestGenerationStackPosition(member: HasMemberActions): StackPosition | undefined {
  const generation = latestGeneration(member);
  if (generation === undefined) return undefined;

  return member.memberActions.find(
    (action) => action.generationNumber === generation && action.stackPosition !== null,
  )?.stackPosition ?? undefined;
}

/**
 * 카드 상단의 소속 문구 (예: "4기 BE"). 항상 최신 기수 기준이고, 기수 필터와 무관하게 고정이에요.
 * 창립 멤버 기록이 있으면 기수 대신 "창립 멤버"를 보여줘요.
 * 든든한 리뷰어(외부)는 기수를 노출하지 않고 트랙 약어만 보여줘요(ADR009).
 */
export function formatAffiliation(member: HasMemberActions): string | undefined {
  if (isFounder(member)) return "창립 멤버";

  const generation = latestGeneration(member);
  if (generation === undefined) return undefined;

  const stackPosition = latestGenerationStackPosition(member);
  if (isExternalMember(member)) {
    return stackPosition ? formatStackPosition(stackPosition) : undefined;
  }
  return stackPosition ? `${generation}기 ${formatStackPosition(stackPosition)}` : `${generation}기`;
}

/**
 * 역할 배지. generationNumber가 null이면 "전체" 탭(최신 역할), 아니면 그 기수 시점 역할이에요.
 * 배지 텍스트로 바꾸려면 formatMemberRole을 같이 써요.
 */
export function roleAt(member: HasMemberActions, generationNumber: number | null): ResolvedMemberRole | undefined {
  if (generationNumber !== null) {
    const action = member.memberActions.find((item) => item.generationNumber === generationNumber);
    return action?.memberRole ?? action?.externalMemberRole ?? undefined;
  }
  const action = latestGenerationAction(member) ?? member.memberActions[0];
  return action?.memberRole ?? action?.externalMemberRole ?? undefined;
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

/** 프로필 사진 주소. 깃허브 주소에서 아바타를 가져와요(ADR009) */
export function getAvatarUrl(person: { githubUrl?: string }): string | undefined {
  if (!person.githubUrl) return undefined;
  const username = person.githubUrl.replace(/\/$/, "").split("/").pop();
  return username ? `https://github.com/${username}.png` : undefined;
}
