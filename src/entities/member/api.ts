import { fetchJson, fetchList } from "@/shared/api/fetch";
import type { Member, MemberSummary } from "./model";

const REVALIDATE_SECONDS = 60 * 60;

/**
 * 멤버 목록(내부 멤버 + 든든한 리뷰어). isExternal로 구분해요.
 * TODO: 실제 백엔드는 아직 이 통합이 안 돼 있어요(외부 리뷰어는 별도 테이블·id 체계, 기수 이력 테이블도 없음).
 * MSW는 이상적인 모양(같은 API/id 체계 + isExternal)으로 이미 이렇게 동작해요.
 */
export async function getMembers(): Promise<MemberSummary[]> {
  return fetchList<MemberSummary>("/members", REVALIDATE_SECONDS);
}

/** 상세 프로필. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getMember(id: string): Promise<Member | undefined> {
  return fetchJson<Member>(`/members/${id}`, REVALIDATE_SECONDS);
}

// TODO(기수 중앙화): app/_sections/content.ts의 RECRUITING_COHORT 옆 TODO 참고
const COHORTS = [5, 4, 3, 2, 1];

/** 필터에 쓰는 기수 목록 */
export async function getMemberCohorts(): Promise<number[]> {
  return COHORTS;
}
