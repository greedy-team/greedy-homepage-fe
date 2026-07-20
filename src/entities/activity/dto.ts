// 백엔드 응답 형태(예정). activity는 project·member와 달리 백엔드가 아직 구현을 시작 안 해서
// 실제 확정 스펙이 없어요 — 이 타입은 우리 쪽에서 화면·엔티티·정합 논의를 바탕으로 먼저 제안하는 형태예요.
// tag·generationNumber·location·participants·summary는 논의 끝에 없애기로 했어요(model.ts 주석 참고).
// date는 startDate·endDate 두 필드로 옵니다 — 단일 날짜 활동은 startDate=endDate로 온다고 들었어요.

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
