// 프로젝트 도메인 타입.

export type Project = {
  id: string;
  name: string;
  /** 진행 기수 (예: "3기") */
  cohort: string;
  /** 한 줄 소개 */
  summary: string;
};
