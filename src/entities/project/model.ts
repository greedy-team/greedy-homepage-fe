// 프로젝트 도메인 타입. 서버 명세(Project, ProjectMember)를 화면이 쓰기 좋은 형태로 옮겼어요.
// 서버 전용 필드(생성·수정 시각, FK id)는 화면에 필요할 때만 풀어서 담아요.

/** 담당. 팀원과 기술 스택을 프론트/백엔드로 나누고, 디자인은 따로 표시해요 */
export type MemberPosition = "FE" | "BE" | "디자인";

export type ProjectMember = {
  name: string;
  position: MemberPosition;
  /** 동아리 밖에서 함께한 기여자 */
  external?: boolean;
  /** 이름을 누르면 가는 멤버 프로필. 외부 기여자는 없을 수 있어요 */
  profileHref?: string;
};

/** 목록 카드에 필요한 최소 정보. 상세는 Project로 더 담아요 */
export type ProjectSummary = {
  id: string;
  name: string;
  /** 진행 기수 (예: "3기") */
  cohort: string;
  /** 한 줄 요약 */
  summary: string;
  /** 대표 이미지 주소. 없으면 자리표시자를 보여줘요 */
  thumbnailUrl?: string;
};

export type Project = ProjectSummary & {
  /** 어떤 문제를 풀려고 만들었나 */
  purpose: string;
  /** 주요 기능. 기능이 여러 개라 목록으로 담아요 */
  mainFunction: string[];
  /** 화면 갤러리 이미지들 */
  imageUrls: string[];
  /** 서비스 주소. 미배포면 없어요 */
  siteUrl?: string;
  /** 저장소는 프론트·백엔드가 따로 있어요. 한쪽만 있거나 없을 수 있어요 */
  frontendGithubUrl?: string;
  backendGithubUrl?: string;
  frontendStack: string[];
  backendStack: string[];
  members: ProjectMember[];
};
