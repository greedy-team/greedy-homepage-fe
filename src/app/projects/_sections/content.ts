// 프로젝트 페이지 문구. 서버에서 오지 않고 직접 고치는 콘텐츠예요.

export const PAGE = {
  title: "프로젝트",
  subtitle: "그리디가 기수마다 만들어 온 프로젝트예요.",
} as const;

/** 필터에서 "전체"를 가리키는 값 */
export const ALL = "전체";

export const EMPTY = {
  /** 아직 프로젝트가 없는 기수를 골랐을 때 */
  cohort: (cohort: string) => ({
    title: `${cohort} 프로젝트를 준비하고 있어요`,
    description: "첫 프로젝트가 만들어지면 여기에 올라와요.",
  }),
  /** 전체가 하나도 없을 때 (아직은 볼 일이 없어요) */
  all: {
    title: "아직 공개된 프로젝트가 없어요",
    description: "곧 첫 프로젝트가 올라와요.",
  },
} as const;
