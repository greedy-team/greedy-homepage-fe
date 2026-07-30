// 멤버 도메인 타입. 서버 응답(MemberListResponse/MemberDetailResponse) 모양을 그대로 따랐어요.
// TODO: 백엔드가 Department enum을 아직 안 채웠어요(빈 enum). 실제 값이 정해지면 학과 표시를 붙여요.

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

/** 목록 카드에 필요한 최소 정보. 상세는 Member로 더 담아요 */
export type MemberSummary = {
  id: number;
  name: string;
  githubUrl?: string;
  memberActions: MemberAction[];
};

export type Member = {
  id: number;
  name: string;
  githubUrl?: string;
  /** 서버가 주는 프로필 사진. 없으면 githubUrl에서 깃허브 아바타를 유도해요 */
  imageUrl?: string;
  /** 본인이 직접 쓴 소개. 없으면 숨겨요 */
  description?: string;
  memberActions: MemberAction[];
  teamProjects: TeamProject[];
};

/**
 * 든든한 리뷰어(외부, 그리디 소속 아님). 백엔드에 ExternalMember 엔티티는 있지만
 * 조회 API가 아직 없어서, 이 타입은 지금 정적 데이터 전용이에요.
 * TODO: reviewedGenerations(리뷰로 참여한 기수들)도 백엔드에 아직 저장할 테이블이 없어요
 * (member_action처럼 external_member에 기수를 연결하는 테이블이 없음). 백엔드가
 * 이 데이터를 주기 시작하면(이상적인 모양으로 미리 설계해둔 거예요) 그대로 fetch로 바꿔요.
 */
export type ExternalReviewer = {
  id: number;
  name: string;
  githubUrl?: string;
  stackPosition: StackPosition;
  reviewedGenerations: number[];
};
