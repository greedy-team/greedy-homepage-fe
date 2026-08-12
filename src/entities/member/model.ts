// 멤버 도메인 타입. 서버 응답(MemberListResponse/MemberDetailResponse) 모양을 그대로 따랐어요.
// TODO: departments는 타입만 반영해뒀고 화면엔 아직 안 그려요. 학과 표시 여부/위치는 따로 정해요.

/** 팀원의 기술 스택. project 도메인과 같은 백엔드 enum이지만, entity끼리는 참조하지 않아서 여기 따로 둬요 */
export type StackPosition = "BACKEND" | "FRONTEND" | "DESIGN";

/** 기수별 역할. CO_FOUNDER는 기수 개념이 없는 창립 멤버예요 */
export type MemberRole = "CO_FOUNDER" | "MAINTAINER" | "STUDY_LEAD" | "STUDY_MEMBER" | "REVIEWER";

/**
 * 한 기수에서의 활동 기록. 한 사람이 여러 기수를 지나며 여러 개 쌓여요(중복기수를 고려했어요 2기-FE + 3기-BE).
 * stackPosition은 백엔드 DB에서 NOT NULL이라(리뷰어도 자기 스택은 있어요) 항상 값이 있어요.
 * generationNumber는 CO_FOUNDER처럼 기수 자체가 없는 기록이면 null이에요(백엔드 코드로 확인함).
 */
export type MemberAction = {
  memberRole: MemberRole;
  stackPosition: StackPosition;
  generationNumber: number | null;
};

/** 참여한 팀 프로젝트 하나. 화면에 필요한 나머지 정보(썸네일 등)는 projectId로 project 도메인에서 따로 가져와요 */
export type TeamProject = {
  projectId: number;
  name: string;
  stackPosition: StackPosition;
};

/**
 * 목록 카드에 필요한 최소 정보. 상세는 Member로 더 담아요.
 * 든든한 리뷰어(외부, 그리디 소속 아님)도 같은 API/id 체계로 이 모양 그대로 내려와요 —
 * isExternal로만 구분해요(역할/활동 이력만으로는 내부·외부를 구분할 수 없어서요).
 * TODO: 지금 실제 백엔드는 이 통합이 안 돼 있어요(외부 리뷰어는 별도 테이블·id 체계, isExternal 없음).
 * MSW는 이상적인 모양으로 이미 이렇게 동작해요 — 실제 백엔드가 맞춰주면 그대로 써요.
 */
export type MemberSummary = {
  id: number;
  name: string;
  githubUrl?: string;
  /** 소속 학과. 화면엔 아직 안 그려요 */
  departments: string[];
  memberActions: MemberAction[];
  isExternal?: boolean;
};

export type Member = {
  id: number;
  name: string;
  githubUrl?: string;
  /** 소속 학과. 화면엔 아직 안 그려요 */
  departments: string[];
  /** 본인이 직접 쓴 소개. 없으면 숨겨요 */
  description?: string;
  memberActions: MemberAction[];
  teamProjects: TeamProject[];
  isExternal?: boolean;
};
