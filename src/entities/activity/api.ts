// 활동 기록. 지금은 정적 데이터를 반환하고, API 명세가 확정되면 이 함수 안만 fetch(ISR)로 바꿔요.
// 시안에 있던 4기 활동을 옮겨 둔 임시 데이터예요. 본문·사진·참여 멤버는 실제 기록을 받아 채워요.
import type { Activity, ActivitySummary } from "./model";

const ACTIVITIES: Activity[] = [
  {
    id: "chorok-meetup",
    title: "초록 밋업",
    date: "2026.07",
    summary: "초록스터디와 함께한 연합 밋업이에요.",
    dateLabel: "2026년 6월 21일",
    location: "세종대학교 광개토관",
    body: [
      "초록스터디와 함께 연합 밋업을 열었어요. 각 동아리의 스터디 문화를 공유하고, 코드 리뷰 방식에 대한 이야기를 나눴어요. (추후 변경)",
      "발표가 끝난 뒤에는 자유롭게 네트워킹 시간을 가졌어요. 다음 학기에는 합동 스터디도 함께 하기로 했어요. (추후 변경)",
    ],
    imageUrls: [],
    participantNames: [],
  },
  {
    id: "reviewer-meetup",
    title: "리뷰어와의 만남",
    date: "2026.07",
    summary: "리뷰어들과 만나 한 학기의 리뷰를 돌아봤어요.",
    dateLabel: "2026년 7월",
    body: [],
    imageUrls: [],
    participantNames: [],
  },
  {
    id: "daedongje-booth",
    title: "대동제 부스",
    date: "2026.05",
    summary: "교내 축제에서 게임 부스를 열었어요.",
    dateLabel: "2026년 5월",
    body: [],
    imageUrls: [],
    participantNames: [],
  },
  {
    id: "mt",
    title: "엠티",
    date: "2026.03",
    summary: "다 같이 떠난 개강 엠티예요.",
    dateLabel: "2026년 3월",
    body: [],
    imageUrls: [],
    participantNames: [],
  },
  {
    id: "sports-day",
    title: "동아리 체육대회",
    date: "2026.03",
    summary: "동아리 대항전에서 함께 뛰었어요.",
    dateLabel: "2026년 3월",
    body: [],
    imageUrls: [],
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
