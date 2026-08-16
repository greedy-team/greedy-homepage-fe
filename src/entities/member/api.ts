import { fetchJson, fetchList } from "@/shared/api/fetch";
import { CURRENT_GENERATION } from "@/shared/config/site";
import type { Member, MemberSummary } from "./model";

const REVALIDATE_SECONDS = 60 * 60;

/** 멤버 목록(내부 멤버 + 외부 멤버). 활동 기록의 역할 필드로 둘을 구분해요. */
export async function getMembers(): Promise<MemberSummary[]> {
  return fetchList<MemberSummary>("/members", REVALIDATE_SECONDS);
}

/** 상세 프로필. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getMember(id: string): Promise<Member | undefined> {
  return fetchJson<Member>(`/members/${id}`, REVALIDATE_SECONDS);
}

const COHORTS = Array.from({ length: CURRENT_GENERATION + 1 }, (_, index) => CURRENT_GENERATION + 1 - index);

/** 필터에 쓰는 기수 목록 */
export async function getMemberCohorts(): Promise<number[]> {
  return COHORTS;
}
