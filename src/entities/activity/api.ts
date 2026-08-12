import { fetchJson, fetchList } from "@/shared/api/fetch";
import type { Activity, ActivitySummary } from "./model";

/**
 * 아카이브 데이터라 몇 분 신선도 차이는 의미 없어요. ISR로 1시간마다 갱신해요.
 * 활동/프로젝트는 운영진이 가끔 수정하는 데이터라, 셀프 편집(웹훅 revalidate)이
 * 생기기 전까진 이 주기가 마지막 안전망이에요.
 */
const REVALIDATE_SECONDS = 60 * 60;

/** 활동 페이지 타임라인. 순서는 백엔드에서 startDate 내림차순으로 주기로 했어요 */
export async function getActivities(): Promise<ActivitySummary[]> {
  return fetchList<ActivitySummary>("/activities", REVALIDATE_SECONDS);
}

/** 상세 활동 페이지. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getActivity(id: string): Promise<Activity | undefined> {
  return fetchJson<Activity>(`/activities/${id}`, REVALIDATE_SECONDS);
}
