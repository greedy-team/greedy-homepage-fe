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
 * 든든한 리뷰어(외부, 그리디 소속 아님). 백엔드 테이블은 Member와 분리돼 있지만(id 체계도 별개),
 * 화면에서 다루는 모양은 memberActions를 그대로 재사용해요(역할은 항상 REVIEWER 고정) —
 * 그래야 roleAt/formatAffiliation 같은 함수와 기수 필터 로직을 내부 멤버와 그대로 같이 써요.
 * TODO: 백엔드에 ExternalMember 조회 API + 기수 연결 테이블(지금 없음) + 내부 멤버와
 * 같은 API/id 체계로 노출 요청 — 셋 다 되면 이 타입도 fetch 기반으로 바꿔요.
 */
export type ExternalReviewer = {
  id: number;
  name: string;
  githubUrl?: string;
  memberActions: MemberAction[];
};
