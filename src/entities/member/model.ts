// 멤버 도메인 타입. 서버 명세(Member, Generation)가 확정되면 그 형태에 맞춰 조정해요.

export type Track = "FE" | "BE";

/** 지금 기수 기준 역할. 목록 카드 배지와 역할 필터에 써요 */
export type MemberRole = "운영진" | "리뷰어" | "멤버" | "든든한 리뷰어";

/** 활동 이력 한 칸. 기수마다 카드로 쌓여요 */
export type CohortRecord = {
  cohort: string;
  /** 그 기수의 역할 (예: 백엔드 멤버, 운영진) */
  title: string;
};

export type Member = {
  id: string;
  name: string;
  /**
   * 목록 카드의 소속 줄. 멤버는 "2기 FE"처럼 기수+트랙,
   * 창립 멤버·4기 영입은 그 말 그대로, 든든한 리뷰어(외부)는 트랙 약어만 써요.
   */
  affiliation: string;
  role: MemberRole;
  /** 필터용 구조 값. 리뷰어로 함께한 기수도 포함해요 */
  cohorts: string[];
  tracks: Track[];
  /** 프로필 사진. 없으면 이니셜을 보여줘요 */
  photoUrl?: string;
  /** 깃허브 주소. 없으면 링크를 숨겨요 */
  githubUrl?: string;
  /** 본인이 직접 쓴 소개. 없으면 숨겨요 */
  intro?: string;
  /** 활동 이력. 최신 기수부터 담아요 */
  history: CohortRecord[];
};
