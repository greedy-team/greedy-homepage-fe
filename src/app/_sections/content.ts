// 랜딩 페이지의 정적 문구. 서버에서 오지 않는, 우리가 직접 쓰는 카피예요.
// 프로젝트·활동처럼 백엔드에서 올 데이터는 entities에 있어요.

/** 모집이 열릴 다음 기수. 모집 상태 문구에서 써요. */
export const RECRUITING_COHORT = "5기";

/** 히어로 문구. 모집 상태에 따라 하나를 골라 써요. */
export const HERO = {
  title: "교내 개발 생태계의\n선한 영향력을",
  subtitle: "세종대학교 개발 동아리 그리디예요.\n스터디와 리뷰, 프로젝트로 함께 성장해요.",
  recruiting: {
    badge: `${RECRUITING_COHORT} 모집 중`,
    cta: "지원하기",
    caption: "모집 마감 전에 지원해 주세요.",
  },
  idle: {
    cta: "다음 기수 알림 받기",
    caption: "메일을 남기면 모집이 열릴 때 알려드려요.",
  },
} as const;

/** 그리디의 한 학기 흐름. 스터디에서 데모데이까지 4단계. */
export const STUDY_FLOW = [
  { title: "스터디", description: "트랙별 커리큘럼으로 매주 미션을 구현해요." },
  { title: "코드 리뷰", description: "리뷰어와 티키타카하며 코드를 다듬어요." },
  { title: "팀 프로젝트", description: "팀을 꾸려 실제 서비스를 만들어요." },
  { title: "데모데이", description: "2주마다 발표하고 서로의 성장을 확인해요." },
] as const;

/** 그리디가 지키는 것. 가치 밴드에서 2×2로 보여줘요. */
export const VALUES = [
  { title: "OPEN", description: "모든 정보를 투명하고 공개적으로" },
  { title: "KINDNESS", description: "모두에게 친절하고 따뜻하게" },
  { title: "TOLERANCE", description: "다름을 자연스러운 것으로" },
  { title: "HUMAN COMMUNITY", description: "사람 사는 공동체답게" },
] as const;

// 동아리 요약 숫자. 백엔드가 아니라 기수마다 직접 갱신해요. (누적 멤버 56 = 내부 46 + 든든한 리뷰어 10)
export const STATS = [
  { value: "56", label: "누적 멤버" },
  { value: "4기", label: "진행 기수" },
  { value: "FE, BE", label: "트랙" },
  { value: "6", label: "팀 프로젝트" },
] as const;
