// 팀 프로젝트 목록. 지금은 정적 데이터를 반환하고, API 명세가 확정되면
// 이 함수 안만 fetch(ISR)로 바꿔요. 정렬(최신 기수 우선)도 서버로 옮겨갈 수 있어요.
import type { Project } from "./model";

/** 랜딩 캐러셀에 쓰는 대표 프로젝트. 최신 기수부터 보여줘요. */
export async function getFeaturedProjects(): Promise<Project[]> {
  // TODO: 백엔드 API 연동 (프로젝트는 서버에서 관리)
  return [
    { id: "dugudugu", name: "두구두구", cohort: "3기", summary: "두드림과 학사일정을 캘린더로 구독해요." },
    { id: "meetlink", name: "MeetLink", cohort: "3기", summary: "모임 시간과 장소를 공평하게 정해요." },
    { id: "jubjub", name: "세종 줍줍", cohort: "2기", summary: "지도에서 잃어버린 물건을 찾아줘요." },
    { id: "sejong-life", name: "슬기로운 세종생활", cohort: "2기", summary: "세종대생 전용 장소와 리뷰를 나눠요." },
    { id: "mokkoji", name: "모꼬지", cohort: "1기", summary: "세종대 동아리 정보와 모집을 한곳에 모아요." },
    { id: "ttarahaeng", name: "따라행", cohort: "1기", summary: "여행 영상 속 동선을 코스로 추천해요." },
  ];
}
