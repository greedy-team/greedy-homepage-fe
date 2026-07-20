// 백엔드 응답 형태. 기준 스펙은 docs/openapi.yaml, 논의점은 docs/openapi-1차-대비-변경점.md §4.
// 백엔드 엔티티와 필드 일치 확인됨(2026-07-20). date는 startDate·endDate로 와요(단일 날짜는 둘이 같음).

export type ActivityDto = {
  id: number;
  name: string;
  thumbnailUrl: string | null;
  imageUrls: string[];
  description: string | null;
  startDate: string;
  endDate: string;
};

/** 실 연동 시 이 자리에 GET /activities 응답을 채운다. 백엔드 미구현이라 비워둠(병합 시 curated 그대로 통과). */
export const ACTIVITY_DTOS: ActivityDto[] = [];
