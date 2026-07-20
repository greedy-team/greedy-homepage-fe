// 활동 도메인 타입. 백엔드와 합의된 필드만 담아요 — tag·generationNumber·summary·location·participants는
// 제외해요(디스코드 파싱이라 안정적으로 못 뽑음). 근거·논의점은 docs/openapi-1차-대비-변경점.md §4.

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
