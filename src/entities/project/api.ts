import { fetchJson, fetchList } from "@/shared/api/fetch";
import type { Project, ProjectSummary } from "./model";

/** 아카이브 데이터라 몇 분 신선도 차이는 의미 없어요. ISR로 1시간마다 갱신해요 (향후논의)*/
const REVALIDATE_SECONDS = 60 * 60;


export async function getProjects(): Promise<ProjectSummary[]> {
  return fetchList<ProjectSummary>("/projects", REVALIDATE_SECONDS);
}

/** 상세 프로젝트 정보. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getProject(id: string): Promise<Project | undefined> {
  return fetchJson<Project>(`/projects/${id}`, REVALIDATE_SECONDS);
}

/**
 * 필터에 쓰는 기수 목록. "전체 기수" API가 따로 없어서 직접 관리해요.
 * 프로젝트가 아직 없는 진행 중 기수도 넣어야 해서(빈 상태 노출), 기수가 바뀔 때마다
 * RECRUITING_COHORT(app/_sections/content.ts)와 함께 이 배열도 갱신해요.
 */
const COHORTS = [5, 4, 3, 2, 1];

export async function getCohorts(): Promise<number[]> {
  return COHORTS;
}
