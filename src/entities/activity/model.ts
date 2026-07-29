// 활동 도메인 타입. 서버 응답(ActivityListResponse/ActivityDetailResponse) 모양을 그대로 따라요.
// TODO: 백엔드가 스웨거에 nullable을 명시해주기로 함. 그때 실제로 어떤 필드가 없을 수 있는지
// 다시 보고 옵셔널 처리해요. 특히 thumbnailUrls/images는 배열이라 null과 []가 다를 수 있어요.

/** 목록 타임라인 카드에 필요한 정보. 상세는 Activity로 더 담아요 */
export type ActivitySummary = {
  id: number;
  name: string;
  description: string;
  /** ISO 날짜 문자열 (예: "2026-07-18"). startDate === endDate면 하루짜리예요 */
  startDate: string;
  endDate: string;
  /** 지금은 화면에서 안 써요. 나중에 목록 카드 데스크톱 다중 사진 배치에 쓸 예정 */
  imageCount: number;
  /** 목록 카드용 미리보기 사진들. 없으면 자리표시자를 보여줘요 */
  thumbnailUrls: string[];
};

export type ActivityImage = {
  id: number;
  url: string;
};

export type Activity = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  /** 갤러리 사진들. 대표 사진은 첫 번째(images[0])예요 */
  images: ActivityImage[];
};
