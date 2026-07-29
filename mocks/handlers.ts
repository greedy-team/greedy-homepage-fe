import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "@/shared/api/config";
import type { Activity, ActivitySummary } from "@/entities/activity/model";

/** public/activities/<slug>/1.webp부터 순서대로. 기존 큐레이션 데이터의 실제 사진을 재사용해요 */
function shots(slug: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/activities/${slug}/${index + 1}.webp`);
}

/** 활동 목록. id는 생성 순서(오래된 활동이 작은 id)를 흉내 내고, 최신순으로 나열해요 */
const ACTIVITY_SUMMARIES: ActivitySummary[] = [
  {
    id: 14,
    name: "초록 밋업",
    description: "초록스터디와 함께한 연합 밋업이에요.",
    startDate: "2026-07-18",
    endDate: "2026-07-18",
    imageCount: 4,
    thumbnailUrls: shots("chorok-meetup-2026", 3),
  },
  {
    id: 13,
    name: "코수타",
    description:
      "주말 긴 시간을 발표로 함께 달린 코수타예요.\n주말인데도 긴 시간 끝까지 함께해 주셨어요. 다들 고생 많으셨어요.",
    startDate: "2026-05-30",
    endDate: "2026-05-30",
    imageCount: 4,
    thumbnailUrls: shots("kosuta", 3),
  },
  {
    id: 12,
    name: "축제 부스",
    description: "사흘 동안 함께한 축제 부스 운영이에요.\n3일 동안 진행한 그리디 축제 부스 운영이 잘 마무리됐어요.",
    startDate: "2026-05-23",
    endDate: "2026-05-25",
    imageCount: 2,
    thumbnailUrls: shots("festival-booth-2026", 2),
  },
  {
    id: 11,
    name: "그리디콘",
    description: "한 해를 마무리하며 함께 모인 2025 세종 그리디콘이에요.",
    startDate: "2025-11-20",
    endDate: "2025-11-20",
    imageCount: 2,
    thumbnailUrls: shots("greedycon", 2),
  },
  {
    id: 10,
    name: "2기 최종 데모데이",
    description:
      "6개월 여정을 마무리한 2기 최종 데모데이예요.\n6개월간의 그리디 2기 공식 활동이 마무리됐어요.\n세종 줍줍 팀과 슬기로운 세종생활 팀 모두 멋진 서비스를 만들어 줬어요. 앞으로도 그리디에서 멋진 활동을 이어가요.",
    startDate: "2025-09-17",
    endDate: "2025-09-17",
    imageCount: 3,
    thumbnailUrls: shots("demoday-final-2", 3),
  },
  {
    id: 9,
    name: "리뷰어와의 만남",
    description: "2기 리뷰어분들과 다시 만난 시간이에요.",
    startDate: "2025-09-08",
    endDate: "2025-09-08",
    imageCount: 2,
    thumbnailUrls: shots("reviewer-meetup-2025-09", 2),
  },
  {
    id: 8,
    name: "3기 OT",
    description: "3기의 시작을 함께 연 OT예요.",
    startDate: "2025-09-03",
    endDate: "2025-09-03",
    imageCount: 1,
    thumbnailUrls: shots("ot-3", 1),
  },
  {
    id: 7,
    name: "1차 데모데이",
    description: "팀 프로젝트를 처음 선보인 1차 데모데이예요.",
    startDate: "2025-08-04",
    endDate: "2025-08-04",
    imageCount: 2,
    thumbnailUrls: shots("demoday-1", 2),
  },
  {
    id: 6,
    name: "초록 밋업",
    description: "그리디 2기와 함께한 초록 밋업이에요.",
    startDate: "2025-06-21",
    endDate: "2025-06-21",
    imageCount: 1,
    thumbnailUrls: shots("chorok-meetup-2025-06", 1),
  },
  {
    id: 5,
    name: "축제 부스",
    description: "오픈부터 마감까지 함께한 축제 부스예요.\n첫날부터 생각보다 인기가 많았어요. 부스를 지켜준 멤버들 덕분에 즐겁게 마쳤어요.",
    startDate: "2025-05-14",
    endDate: "2025-05-16",
    imageCount: 4,
    thumbnailUrls: shots("festival-booth-2025", 3),
  },
  {
    id: 4,
    name: "중간총회",
    description: "학기 중간에 다 같이 모인 총회예요.\n사람이 많아 다 같이 섞여 놀지는 못했지만, 함께해서 즐거운 시간이었어요.",
    startDate: "2025-05-09",
    endDate: "2025-05-09",
    imageCount: 1,
    thumbnailUrls: shots("general-meeting-2025", 1),
  },
  {
    id: 3,
    name: "2기 OT",
    description: "2기의 첫 만남, OT예요.",
    startDate: "2025-03-06",
    endDate: "2025-03-06",
    imageCount: 1,
    thumbnailUrls: shots("ot-2", 1),
  },
  {
    id: 2,
    name: "겨울 초록 밋업",
    description: "겨울에 다시 모인 초록 밋업이에요.",
    startDate: "2025-01-18",
    endDate: "2025-01-18",
    imageCount: 1,
    thumbnailUrls: shots("chorok-meetup-2025-01", 1),
  },
  {
    id: 1,
    name: "리뷰어와의 만남",
    description: "리뷰어분들과 직접 만나 이야기를 나눈 시간이에요.",
    startDate: "2025-01-12",
    endDate: "2025-01-12",
    imageCount: 3,
    thumbnailUrls: shots("reviewer-meetup-2025-01", 3),
  },
];

/** 활동 상세. id는 위 목록과 같은 활동을 가리켜요 */
const ACTIVITY_DETAILS: Activity[] = [
  {
    id: 14,
    name: "초록 밋업",
    description: "초록스터디와 함께한 연합 밋업이에요.",
    startDate: "2026-07-18",
    endDate: "2026-07-18",
    images: shots("chorok-meetup-2026", 4).map((url, index) => ({ id: 1400 + index, url })),
  },
  {
    id: 13,
    name: "코수타",
    description:
      "주말 긴 시간을 발표로 함께 달린 코수타예요.\n주말인데도 긴 시간 끝까지 함께해 주셨어요. 다들 고생 많으셨어요.",
    startDate: "2026-05-30",
    endDate: "2026-05-30",
    images: shots("kosuta", 4).map((url, index) => ({ id: 1300 + index, url })),
  },
  {
    id: 12,
    name: "축제 부스",
    description: "사흘 동안 함께한 축제 부스 운영이에요.\n3일 동안 진행한 그리디 축제 부스 운영이 잘 마무리됐어요.",
    startDate: "2026-05-23",
    endDate: "2026-05-25",
    images: shots("festival-booth-2026", 2).map((url, index) => ({ id: 1200 + index, url })),
  },
  {
    id: 11,
    name: "그리디콘",
    description: "한 해를 마무리하며 함께 모인 2025 세종 그리디콘이에요.",
    startDate: "2025-11-20",
    endDate: "2025-11-20",
    images: shots("greedycon", 2).map((url, index) => ({ id: 1100 + index, url })),
  },
  {
    id: 10,
    name: "2기 최종 데모데이",
    description:
      "6개월 여정을 마무리한 2기 최종 데모데이예요.\n6개월간의 그리디 2기 공식 활동이 마무리됐어요.\n세종 줍줍 팀과 슬기로운 세종생활 팀 모두 멋진 서비스를 만들어 줬어요. 앞으로도 그리디에서 멋진 활동을 이어가요.",
    startDate: "2025-09-17",
    endDate: "2025-09-17",
    images: shots("demoday-final-2", 3).map((url, index) => ({ id: 1000 + index, url })),
  },
  {
    id: 9,
    name: "리뷰어와의 만남",
    description: "2기 리뷰어분들과 다시 만난 시간이에요.",
    startDate: "2025-09-08",
    endDate: "2025-09-08",
    images: shots("reviewer-meetup-2025-09", 2).map((url, index) => ({ id: 900 + index, url })),
  },
  {
    id: 8,
    name: "3기 OT",
    description: "3기의 시작을 함께 연 OT예요.",
    startDate: "2025-09-03",
    endDate: "2025-09-03",
    images: shots("ot-3", 1).map((url, index) => ({ id: 800 + index, url })),
  },
  {
    id: 7,
    name: "1차 데모데이",
    description: "팀 프로젝트를 처음 선보인 1차 데모데이예요.",
    startDate: "2025-08-04",
    endDate: "2025-08-04",
    images: shots("demoday-1", 2).map((url, index) => ({ id: 700 + index, url })),
  },
  {
    id: 6,
    name: "초록 밋업",
    description: "그리디 2기와 함께한 초록 밋업이에요.",
    startDate: "2025-06-21",
    endDate: "2025-06-21",
    images: shots("chorok-meetup-2025-06", 1).map((url, index) => ({ id: 600 + index, url })),
  },
  {
    id: 5,
    name: "축제 부스",
    description: "오픈부터 마감까지 함께한 축제 부스예요.\n첫날부터 생각보다 인기가 많았어요. 부스를 지켜준 멤버들 덕분에 즐겁게 마쳤어요.",
    startDate: "2025-05-14",
    endDate: "2025-05-16",
    images: shots("festival-booth-2025", 4).map((url, index) => ({ id: 500 + index, url })),
  },
  {
    id: 4,
    name: "중간총회",
    description: "학기 중간에 다 같이 모인 총회예요.\n사람이 많아 다 같이 섞여 놀지는 못했지만, 함께해서 즐거운 시간이었어요.",
    startDate: "2025-05-09",
    endDate: "2025-05-09",
    images: shots("general-meeting-2025", 1).map((url, index) => ({ id: 400 + index, url })),
  },
  {
    id: 3,
    name: "2기 OT",
    description: "2기의 첫 만남, OT예요.",
    startDate: "2025-03-06",
    endDate: "2025-03-06",
    images: shots("ot-2", 1).map((url, index) => ({ id: 300 + index, url })),
  },
  {
    id: 2,
    name: "겨울 초록 밋업",
    description: "겨울에 다시 모인 초록 밋업이에요.",
    startDate: "2025-01-18",
    endDate: "2025-01-18",
    images: shots("chorok-meetup-2025-01", 1).map((url, index) => ({ id: 200 + index, url })),
  },
  {
    id: 1,
    name: "리뷰어와의 만남",
    description: "리뷰어분들과 직접 만나 이야기를 나눈 시간이에요.",
    startDate: "2025-01-12",
    endDate: "2025-01-12",
    images: shots("reviewer-meetup-2025-01", 3).map((url, index) => ({ id: 100 + index, url })),
  },
];

export const handlers = [
  http.get(`${API_BASE_URL}/activities`, () => {
    return HttpResponse.json({ items: ACTIVITY_SUMMARIES });
  }),

  http.get(`${API_BASE_URL}/activities/:id`, ({ params }) => {
    const activity = ACTIVITY_DETAILS.find((item) => item.id === Number(params.id));
    if (!activity) {
      return HttpResponse.json({ code: 40403, message: "활동을 찾을 수 없습니다." }, { status: 404 });
    }
    return HttpResponse.json(activity);
  }),
];
