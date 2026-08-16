// 랜딩 페이지와 루트 특수 화면(404)의 정적 문구. 서버에서 오지 않는, 우리가 직접 쓰는 카피예요.
// 프로젝트·활동처럼 백엔드에서 올 데이터는 entities에 있어요.
import { CURRENT_GENERATION, TEAM_PROJECT_COUNT, TOTAL_MEMBER_COUNT, TRACKS } from "@/shared/config/site";

/** 모집이 열릴 다음 기수. 모집 상태 문구에서 써요. */
export const RECRUITING_COHORT = `${CURRENT_GENERATION + 1}기`;

/** 히어로 문구. 모집 상태에 따라 하나를 골라 써요. */
export const HERO = {
  title: "교내 개발 생태계의\n선한 영향력을",
  subtitle: "세종대학교 개발 동아리 그리디예요.\n스터디와 리뷰, 프로젝트로 함께 성장해요.",
  recruiting: {
    badge: `${RECRUITING_COHORT} 모집 중`,
    cta: "지원하기",
    caption: "모집 마감 전에 지원해 주세요.",
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

/** 동아리 요약 숫자. 값 자체는 site.ts에서 기수마다 갱신해요 */
export const STATS = [
  { value: String(TOTAL_MEMBER_COUNT), label: "누적 멤버" },
  { value: `${CURRENT_GENERATION}기`, label: "진행 기수" },
  { value: TRACKS, label: "트랙" },
  { value: String(TEAM_PROJECT_COUNT), label: "팀 프로젝트" },
] as const;

/** 404 화면 문구. 자주 가는 페이지 링크는 GNB가 하고 있어서 문구와 홈 버튼만 둬요 */
export const NOT_FOUND = {
  title: "앗, 찾는 페이지가 없어요",
  description: "주소가 바뀌었거나 사라진 페이지예요. 입력한 주소를 다시 확인해 보세요.",
  cta: "홈으로 가기",
} as const;
