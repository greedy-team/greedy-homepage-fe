// 활동 기록. 큐레이션(ACTIVITIES)에 백엔드 응답(dto)을 합쳐 화면에 내보내요.
// API_BASE_URL이 없으면(백엔드 미구현) fetch를 아예 안 하고 큐레이션 그대로 나가요.
// 시안에 있던 4기 활동을 옮겨 둔 임시 데이터예요. 본문·사진은 실제 기록을 받아 채워요.
//
// project처럼 슬러그↔백엔드id 매핑표가 없어요 — activity는 백엔드가 아직 구현 전이라 실제 숫자 id
// 자체가 없어요. member처럼 목록을 통째로 불러서 제목(title)으로 매칭해요.
import type { Activity, ActivitySummary } from "./model";
import type { ActivityDto } from "./dto";

const API_BASE_URL = process.env.API_BASE_URL;

const ACTIVITIES: Activity[] = [
  {
    id: "chorok-meetup",
    title: "초록 밋업",
    date: "2026.07",
    dateLabel: "2026년 6월 21일",
    body: [
      "초록스터디와 함께 연합 밋업을 열었어요. 각 동아리의 스터디 문화를 공유하고, 코드 리뷰 방식에 대한 이야기를 나눴어요. (추후 변경)",
      "발표가 끝난 뒤에는 자유롭게 네트워킹 시간을 가졌어요. 다음 학기에는 합동 스터디도 함께 하기로 했어요. (추후 변경)",
    ],
    imageUrls: [],
  },
  {
    id: "reviewer-meetup",
    title: "리뷰어와의 만남",
    date: "2026.07",
    dateLabel: "2026년 7월",
    body: [],
    imageUrls: [],
  },
  {
    id: "daedongje-booth",
    title: "대동제 부스",
    date: "2026.05",
    dateLabel: "2026년 5월",
    body: [],
    imageUrls: [],
  },
  {
    id: "mt",
    title: "엠티",
    date: "2026.03",
    dateLabel: "2026년 3월",
    body: [],
    imageUrls: [],
  },
  {
    id: "sports-day",
    title: "동아리 체육대회",
    date: "2026.03",
    dateLabel: "2026년 3월",
    body: [],
    imageUrls: [],
  },
];

/** "YYYY-MM-DD" → 화면 표시용 두 문구. 타임존 오차 없게 문자열을 직접 쪼개요(Date 객체 안 씀) */
function formatDate(isoDate: string): { date: string; dateLabel: string } {
  const [year, month, day] = isoDate.split("-").map(Number);
  return {
    date: `${year}.${String(month).padStart(2, "0")}`,
    dateLabel: `${year}년 ${month}월 ${day}일`,
  };
}

/**
 * 백엔드 응답(dto)과 큐레이션(curated)을 합쳐요. 날짜는 dto의 startDate에서 파생하고,
 * body는 description을 문단(\n\n) 기준으로 나눠요. dto가 없으면 curated를 그대로 반환해요.
 */
function mergeActivityDetail(curated: Activity, dto: ActivityDto | undefined): Activity {
  if (!dto) return curated;

  const { date, dateLabel } = formatDate(dto.startDate);
  return {
    ...curated,
    date,
    dateLabel,
    thumbnailUrl: dto.thumbnailUrl ?? curated.thumbnailUrl,
    imageUrls: dto.imageUrls.length > 0 ? dto.imageUrls : curated.imageUrls,
    body: dto.description ? dto.description.split("\n\n") : curated.body,
  };
}

/**
 * 목록 응답을 가져와요. 실패하거나 API_BASE_URL이 없으면(백엔드 미구현) 빈 배열 —
 * mergeActivityDetail이 빈 배열을 "dto 없음"으로 처리해서 큐레이션 그대로 나가요.
 */
async function fetchActivityDtos(): Promise<ActivityDto[]> {
  if (!API_BASE_URL) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/activities`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return (await res.json()) as ActivityDto[];
  } catch {
    return [];
  }
}

async function getMergedActivities(): Promise<Activity[]> {
  const dtos = await fetchActivityDtos();
  const dtoByTitle = new Map(dtos.map((dto) => [dto.name, dto]));
  return ACTIVITIES.map((curated) => mergeActivityDetail(curated, dtoByTitle.get(curated.title)));
}

function toSummary(activity: Activity): ActivitySummary {
  const { id, title, date, thumbnailUrl } = activity;
  return { id, title, date, thumbnailUrl };
}

/** 활동 페이지 타임라인. 최신부터 담겨 있어요 */
export async function getActivities(): Promise<ActivitySummary[]> {
  const merged = await getMergedActivities();
  return merged.map(toSummary);
}

/** 상세 한 건. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getActivity(id: string): Promise<Activity | undefined> {
  const merged = await getMergedActivities();
  return merged.find((activity) => activity.id === id);
}

/** 랜딩 활동 미리보기에 쓰는 최근 활동 */
export async function getRecentActivities(limit = 3): Promise<ActivitySummary[]> {
  const merged = await getMergedActivities();
  return merged.map(toSummary).slice(0, limit);
}
