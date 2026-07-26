// 멤버 페이지 문구. 서버에서 오지 않고 직접 고치는 콘텐츠예요.

export const PAGE = {
  title: "멤버",
  subtitle: "그리디를 함께 만들어 온 사람들이에요.",
} as const;

/** 필터에서 "전체"를 가리키는 값 */
export const ALL = "전체";

/** 역할 필터. 리드는 운영진에, 든든한 리뷰어는 리뷰어에 포함돼요 */
export const ROLE_FILTERS = ["멤버", "운영진", "리뷰어"] as const;

export const EMPTY = {
  title: "조건에 맞는 멤버가 없어요",
  description: "다른 기수나 역할로 바꿔 보세요.",
} as const;

export const PROFILE = {
  back: "멤버로",
  github: "GitHub 보기",
  historyTitle: "활동 이력",
  projectsTitle: "프로젝트",
} as const;
