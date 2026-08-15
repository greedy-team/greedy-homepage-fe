// 사이트 전역 상수. 모집이 열리고 닫힐 때 이 파일만 바꾸면 돼요.
// 자세한 배경은 docs/adr/004-모집-상태-스위치.md 참고.

export const SITE_NAME = "그리디";
export const SITE_DESCRIPTION = "세종대학교 개발 동아리 그리디예요. 스터디와 프로젝트로 함께 성장해요.";

/** 사이트 대표 주소. OG 카드·사이트맵이 이 값을 봐요 */
export const SITE_URL = "https://www.greedy-homepage.com";

/** 구글 애널리틱스 4 측정 ID */
export const GA_ID = "G-VKLBWJPHG1";

/** 모집 상태 스위치. GNB 버튼, 히어로, 하단 고정 CTA가 이 값 하나를 봐요. */
export const IS_RECRUITING = true;

/** 지금 진행 중인 기수. 기수가 바뀌면 이 값만 바꿔요. 모집 문구·통계·기수 필터가 전부 여기서 파생돼요. */
export const CURRENT_GENERATION = 4;

/** 모집 알림 구글폼. 폼이 만들어지면 주소를 채워요. */
export const RECRUIT_FORM_URL = "";

/** 지원 폼(모집 기간). 모집이 열리면 주소를 채워요. */
export const APPLY_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfrKMZgBItyvnbbEMszo5zSwhCBG6UE7Lb4MKL9Egy7tLAd7A/viewform?usp=dialog";

/** 누적 멤버 수. 내부 멤버만 세요(외부 든든한 리뷰어 제외). 기수마다 갱신해요. */
export const TOTAL_MEMBER_COUNT = 46;

/** 진행 중인 트랙. 기수마다 갱신해요. */
export const TRACKS = "FE, BE";

/** 누적 팀 프로젝트 수. 기수마다 갱신해요. */
export const TEAM_PROJECT_COUNT = 6;

/** GNB 메뉴. 순서 그대로 그려져요. */
export const NAV_ITEMS = [
  { label: "활동", href: "/activities" },
  { label: "멤버", href: "/members" },
  { label: "스터디", href: "/study" },
  { label: "프로젝트", href: "/projects" },
] as const;

export const LINKS = {
  github: "https://github.com/greedy-team",
  discord: "https://discord.gg/zZgacYnwZ3",
  email: "greedydeerg@gmail.com",
  instagram: "https://www.instagram.com/sejong_greedy/",
} as const;
