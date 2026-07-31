// 프로젝트 도메인 타입. 서버 응답(ProjectListResponse/ProjectDetailResponse) 모양을 그대로 따라요.
// TODO: 백엔드 API 변경 후 nullable한 필드들에 대한 타입을 수정해야 해요

/** 팀원의 기술 스택 포지션. 백엔드 enum 그대로예요 'DESIGN'은 추가로 참가하시는 디자인 팀원을 의미해요 */
export type StackPosition = "BACKEND" | "FRONTEND" | "DESIGN";

export type ProjectMember = {
  memberId: number;
  name: string;
  stackPosition: StackPosition;
};

/** 목록 카드에 필요한 최소 정보. 상세는 Project로 더 담아요 */
export type ProjectSummary = {
  id: number;
  name: string;
  /** 한 줄 요약 */
  summary: string;
  /** 대표 이미지 주소. 없으면 자리표시자를 보여줘요 */
  thumbnailUrl?: string;
  /** 진행 기수 번호 (예: 3). 화면에서 "3기"로 포맷해요 */
  generationNumber: number;
};

export type Project = {
  id: number;
  name: string;
  summary: string;
  thumbnailUrl?: string;
  generationNumber: number;
  /** 어떤 문제를 풀었나요 */
  purpose: string;
  /** 주요 기능. \n으로 구분된 문자열이에요(design-system.md 관례) */
  mainFunction: string;
  /** 서비스 주소. 미배포면 없어요 */
  siteUrl?: string;
  /** 저장소는 프론트·백엔드가 따로 있어요. 한쪽만 있거나 없을 수 있어요 */
  frontendGithubUrl?: string;
  backendGithubUrl?: string;
  /** 스택 확장성을 위해 자유 문자열로 둬요 */
  frontendStack: string[];
  backendStack: string[];
  /** 화면 갤러리 이미지들 */
  screenshotUrls: string[];
  team: ProjectMember[];
};
