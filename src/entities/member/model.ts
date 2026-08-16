// 멤버 도메인 타입. 서버 응답(MemberListResponse/MemberDetailResponse) 모양을 그대로 따랐어요.
// TODO: departmentKoreanNames는 타입만 반영해뒀고 화면엔 아직 안 그려요. 학과 표시 여부/위치는 따로 정해요.

/** 팀원의 기술 스택. project 도메인과 같은 백엔드 enum이지만, entity끼리는 참조하지 않아서 여기 따로 둬요 */
export type StackPosition = "BACKEND" | "FRONTEND" | "DESIGN";

/** 기수별 역할. CO_FOUNDER는 기수 개념이 없는 창립 멤버예요 */
export type MemberRole = "CO_FOUNDER" | "MAINTAINER" | "STUDY_LEAD" | "STUDY_MEMBER" | "REVIEWER";

/** 그리디 소속이 아닌 멤버의 역할이에요. memberRole과 동시에 내려오지 않아요. */
export type ExternalMemberRole = "REVIEWER" | "PROJECT_MEMBER";

/** 목록·프로필 배지에서 사용하는 역할의 합집합이에요. */
export type ResolvedMemberRole = MemberRole | ExternalMemberRole;

/**
 * 한 기수에서의 활동 기록. 한 사람이 여러 기수를 지나며 여러 개 쌓여요(중복기수를 고려했어요 2기-FE + 3기-BE).
 * stackPosition은 운영진처럼 트랙을 나누지 않는 활동 기록에서 null일 수 있어요.
 * generationNumber는 CO_FOUNDER처럼 기수 자체가 없는 기록이면 null이에요(백엔드 코드로 확인함).
 */
export type MemberAction = {
  /** 내부 멤버의 역할. 외부 멤버 기록에서는 null이에요. */
  memberRole: MemberRole | null;
  /** 외부 멤버의 역할. 내부 멤버 기록에서는 null이에요. */
  externalMemberRole: ExternalMemberRole | null;
  /** 운영진처럼 트랙을 나누지 않는 활동 기록에서는 null일 수 있어요. */
  stackPosition: StackPosition | null;
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
 * 든든한 리뷰어(외부, 그리디 소속 아님)도 같은 API/id 체계로 이 모양 그대로 내려와요.
 * memberActions 안에서 memberRole과 externalMemberRole 중 하나만 값이 있어요.
 */
export type MemberSummary = {
  id: number;
  name: string;
  githubUrl?: string;
  /** 소속 학과 한국어 이름 목록. 화면엔 아직 안 그려요 */
  departmentKoreanNames: string[];
  memberActions: MemberAction[];
};

export type Member = {
  id: number;
  name: string;
  githubUrl?: string;
  /** 소속 학과 한국어 이름 목록. 화면엔 아직 안 그려요 */
  departmentKoreanNames: string[];
  /** 본인이 직접 쓴 소개. 없으면 숨겨요 */
  description?: string;
  memberActions: MemberAction[];
  teamProjects: TeamProject[];
};
