// 활동 도메인 타입. 백엔드 엔티티·정합 논의 기준으로 확정된 필드만 담아요(2026-07).
// 기수와 종류(tag)는 안 붙여요 — 백엔드도 이 필드들을 없애기로 했고, 화면도 원래 안 썼어요.
// summary·location·participants도 없애기로 했어요 — 디스코드에서 파싱해 오는 데이터라
// 구조화된 값(장소·참가자)이나 별도 요약문을 안정적으로 뽑기 어려워서예요(본문 자체가 없을 수도 있어요).

/** 목록 타임라인 카드에 필요한 정보. 상세는 Activity로 더 담아요 */
export type ActivitySummary = {
  id: string;
  title: string;
  /** 활동 시점 (예: "2026.07"). 타임라인 정렬·표시에 써요. 백엔드 startDate에서 파생해요 */
  date: string;
  /** 대표 사진(미리보기용). 없으면 자리표시자를 보여줘요 */
  thumbnailUrl?: string;
};

export type Activity = ActivitySummary & {
  /** 상세 헤더의 날짜 문구 (예: "2026년 6월 21일"). 백엔드 startDate에서 파생해요 */
  dateLabel: string;
  /** 본문 문단들. 없을 수 있어요(사진만 있는 활동) */
  body: string[];
  /** 갤러리 사진들(전체보기용) */
  imageUrls: string[];
};
