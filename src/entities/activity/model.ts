// 활동 도메인 타입. 서버 명세가 확정되면 그 형태에 맞춰 조정해요.
// 기수와 종류는 붙이지 않아요. 언제는 날짜가, 무엇인지는 제목이 말해줘요.

/** 목록 타임라인 카드에 필요한 정보. 상세는 Activity로 더 담아요 */
export type ActivitySummary = {
  id: string;
  title: string;
  /** 활동 시점 (예: "2026.07"). 타임라인 정렬·표시에 써요 */
  date: string;
  /** 한 줄 설명 */
  summary: string;
  /** 대표 사진. 없으면 자리표시자를 보여줘요 */
  thumbnailUrl?: string;
};

export type Activity = ActivitySummary & {
  /** 상세 헤더의 날짜 문구 (예: "2026년 6월 21일") */
  dateLabel: string;
  /** 장소. 없으면 날짜만 보여요 */
  location?: string;
  /** 본문 문단들 */
  body: string[];
  /** 갤러리 사진들 */
  imageUrls: string[];
  /** 함께한 멤버 이름들. 멤버 프로필과는 화면(app)에서 이어요 */
  participantNames: string[];
};
