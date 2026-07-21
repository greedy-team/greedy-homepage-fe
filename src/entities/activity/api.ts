// 활동 기록. 지금은 정적 데이터를 반환하고, API 명세가 확정되면 이 함수 안만 fetch(ISR)로 바꿔요.
// 노션 활동 기록에서 옮겨 왔어요. 공식 행사만 담아요 (회식·엠티 같은 사적 모임은 넣지 않아요).
import type { Activity, ActivitySummary } from "./model";

/** public/activities/<id>/1.webp부터 순서대로 */
function shots(id: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/activities/${id}/${index + 1}.webp`);
}

const ACTIVITIES: Activity[] = [
  {
    id: "chorok-meetup-2026",
    title: "초록 밋업",
    date: "2026.07",
    summary: "초록스터디와 함께한 연합 밋업이에요.",
    dateLabel: "2026년 7월",
    body: [],
    thumbnailUrl: "/activities/chorok-meetup-2026/1.webp",
    imageUrls: shots("chorok-meetup-2026", 4),
    participantNames: [],
  },
  {
    id: "kosuta",
    title: "코수타",
    date: "2026.05",
    summary: "주말 긴 시간을 발표로 함께 달린 코수타예요.",
    dateLabel: "2026년 5월 30일",
    body: ["주말인데도 긴 시간 끝까지 함께해 주셨어요. 다들 고생 많으셨어요."],
    thumbnailUrl: "/activities/kosuta/1.webp",
    imageUrls: shots("kosuta", 4),
    participantNames: [],
  },
  {
    id: "festival-booth-2026",
    title: "축제 부스",
    date: "2026.05",
    summary: "사흘 동안 함께한 축제 부스 운영이에요.",
    dateLabel: "2026년 5월 23일",
    body: ["3일 동안 진행한 그리디 축제 부스 운영이 잘 마무리됐어요."],
    thumbnailUrl: "/activities/festival-booth-2026/1.webp",
    imageUrls: shots("festival-booth-2026", 2),
    participantNames: [],
  },
  {
    id: "greedycon",
    title: "그리디콘",
    date: "2025.11",
    summary: "한 해를 마무리하며 함께 모인 2025 세종 그리디콘이에요.",
    dateLabel: "2025년 11월 20일",
    body: [],
    thumbnailUrl: "/activities/greedycon/1.webp",
    imageUrls: shots("greedycon", 2),
    participantNames: [],
  },
  {
    id: "demoday-final-2",
    title: "2기 최종 데모데이",
    date: "2025.09",
    summary: "6개월 여정을 마무리한 2기 최종 데모데이예요.",
    dateLabel: "2025년 9월 17일",
    body: [
      "6개월간의 그리디 2기 공식 활동이 마무리됐어요.",
      "세종 줍줍 팀과 슬기로운 세종생활 팀 모두 멋진 서비스를 만들어 줬어요. 앞으로도 그리디에서 멋진 활동을 이어가요.",
    ],
    thumbnailUrl: "/activities/demoday-final-2/1.webp",
    imageUrls: shots("demoday-final-2", 3),
    participantNames: [],
  },
  {
    id: "reviewer-meetup-2025-09",
    title: "리뷰어와의 만남",
    date: "2025.09",
    summary: "2기 리뷰어분들과 다시 만난 시간이에요.",
    dateLabel: "2025년 9월 8일",
    body: [],
    thumbnailUrl: "/activities/reviewer-meetup-2025-09/1.webp",
    imageUrls: shots("reviewer-meetup-2025-09", 2),
    participantNames: [],
  },
  {
    id: "ot-3",
    title: "3기 OT",
    date: "2025.09",
    summary: "3기의 시작을 함께 연 OT예요.",
    dateLabel: "2025년 9월 3일",
    body: [],
    thumbnailUrl: "/activities/ot-3/1.webp",
    imageUrls: shots("ot-3", 1),
    participantNames: [],
  },
  {
    id: "demoday-1",
    title: "1차 데모데이",
    date: "2025.08",
    summary: "팀 프로젝트를 처음 선보인 1차 데모데이예요.",
    dateLabel: "2025년 8월 4일",
    body: [],
    thumbnailUrl: "/activities/demoday-1/2.webp",
    imageUrls: shots("demoday-1", 2),
    participantNames: [],
  },
  {
    id: "chorok-meetup-2025-06",
    title: "초록 밋업",
    date: "2025.06",
    summary: "그리디 2기와 함께한 초록 밋업이에요.",
    dateLabel: "2025년 6월 21일",
    body: [],
    thumbnailUrl: "/activities/chorok-meetup-2025-06/1.webp",
    imageUrls: shots("chorok-meetup-2025-06", 1),
    participantNames: [],
  },
  {
    id: "festival-booth-2025",
    title: "축제 부스",
    date: "2025.05",
    summary: "오픈부터 마감까지 함께한 축제 부스예요.",
    dateLabel: "2025년 5월 14일",
    body: ["첫날부터 생각보다 인기가 많았어요. 부스를 지켜준 멤버들 덕분에 즐겁게 마쳤어요."],
    thumbnailUrl: "/activities/festival-booth-2025/3.webp",
    imageUrls: shots("festival-booth-2025", 4),
    participantNames: [],
  },
  {
    id: "general-meeting-2025",
    title: "중간총회",
    date: "2025.05",
    summary: "학기 중간에 다 같이 모인 총회예요.",
    dateLabel: "2025년 5월 9일",
    body: ["사람이 많아 다 같이 섞여 놀지는 못했지만, 함께해서 즐거운 시간이었어요."],
    thumbnailUrl: "/activities/general-meeting-2025/1.webp",
    imageUrls: shots("general-meeting-2025", 1),
    participantNames: [],
  },
  {
    id: "ot-2",
    title: "2기 OT",
    date: "2025.03",
    summary: "2기의 첫 만남, OT예요.",
    dateLabel: "2025년 3월 6일",
    body: [],
    thumbnailUrl: "/activities/ot-2/1.webp",
    imageUrls: shots("ot-2", 1),
    participantNames: [],
  },
  {
    id: "chorok-meetup-2025-01",
    title: "겨울 초록 밋업",
    date: "2025.01",
    summary: "겨울에 다시 모인 초록 밋업이에요.",
    dateLabel: "2025년 1월 18일",
    body: [],
    thumbnailUrl: "/activities/chorok-meetup-2025-01/1.webp",
    imageUrls: shots("chorok-meetup-2025-01", 1),
    participantNames: [],
  },
  {
    id: "reviewer-meetup-2025-01",
    title: "리뷰어와의 만남",
    date: "2025.01",
    summary: "리뷰어분들과 직접 만나 이야기를 나눈 시간이에요.",
    dateLabel: "2025년 1월 12일",
    body: [],
    thumbnailUrl: "/activities/reviewer-meetup-2025-01/1.webp",
    imageUrls: shots("reviewer-meetup-2025-01", 3),
    participantNames: [],
  },
];

function toSummary(activity: Activity): ActivitySummary {
  const { id, title, date, summary, thumbnailUrl } = activity;
  return { id, title, date, summary, thumbnailUrl };
}

/** 활동 페이지 타임라인. 최신부터 담겨 있어요 */
export async function getActivities(): Promise<ActivitySummary[]> {
  // TODO: 백엔드 API 연동 (활동은 사진과 함께 서버에서 관리)
  return ACTIVITIES.map(toSummary);
}

/** 상세 한 건. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getActivity(id: string): Promise<Activity | undefined> {
  return ACTIVITIES.find((activity) => activity.id === id);
}

/** 랜딩 활동 미리보기에 쓰는 최근 활동 */
export async function getRecentActivities(limit = 3): Promise<ActivitySummary[]> {
  return ACTIVITIES.map(toSummary).slice(0, limit);
}
