// 활동 기록. 지금은 정적 데이터를 반환하고, API 명세가 확정되면
// 이 함수 안만 fetch(ISR)로 바꿔요.
import type { ActivityItem } from "./model";

/** 랜딩 활동 미리보기에 쓰는 최근 활동. */
export async function getRecentActivities(limit = 3): Promise<ActivityItem[]> {
  // TODO: 백엔드 API 연동 (활동은 사진과 함께 서버에서 관리)
  const activities: ActivityItem[] = [
    { id: "greedycon", title: "그리디콘", date: "2026.09" },
    { id: "mt", title: "엠티", date: "2026.09" },
    { id: "festival-booth", title: "축제 부스", date: "2026.05" },
  ];
  return activities.slice(0, limit);
}
