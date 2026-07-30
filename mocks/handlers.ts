import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "@/shared/api/config";
import type { Activity, ActivitySummary } from "@/entities/activity/model";
import type { Project, ProjectSummary } from "@/entities/project/model";

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
    /** todos: 백앤드 api 이미지 url포멧 나오면 링크 형식 맞추기 */
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

/** public/projects/<slug>/1.webp부터 순서대로. 기존 큐레이션 데이터의 실제 사진을 재사용해요 */
function screenshots(slug: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/projects/${slug}/${index + 1}.webp`);
}

/** 프로젝트 목록 */
const PROJECT_SUMMARIES: ProjectSummary[] = [
  {
    id: 6,
    name: "두구두구",
    summary: "두드림 공지와 학사일정을 개인 맞춤 캘린더로 구독하는 서비스예요.",
    thumbnailUrl: "/projects/doogoo/1.webp",
    generationNumber: 3,
  },
  {
    id: 5,
    name: "MeetLink",
    summary: "최적의 모임 시간과 공평한 장소를 추천하는 서비스예요.",
    thumbnailUrl: "/projects/meetlink/thumb.webp",
    generationNumber: 3,
  },
  {
    id: 4,
    name: "세종 줍줍",
    summary: "지도에서 잃어버린 물건을 찾아주는 분실물 서비스예요.",
    thumbnailUrl: "/projects/zupzup/1.webp",
    generationNumber: 2,
  },
  {
    id: 3,
    name: "슬기로운 세종생활",
    summary: "세종대 근처 장소 정보와 세종대생이 쓴 리뷰를 나누는 서비스예요.",
    thumbnailUrl: "/projects/sejong-life/1.webp",
    generationNumber: 2,
  },
  {
    id: 2,
    name: "모꼬지",
    summary: "세종대학교 동아리 정보를 한곳에 모은 동아리 통합 플랫폼이에요.",
    thumbnailUrl: "/projects/mokkoji/thumb.webp",
    generationNumber: 1,
  },
  {
    id: 1,
    name: "따라행",
    summary: "여행 브이로그 코스를 그대로 따라가는 여행 코스 추천 서비스예요.",
    thumbnailUrl: "/projects/ddarahang/1.webp",
    generationNumber: 1,
  },
];

/** 프로젝트 상세. id는 위 목록과 같은 프로젝트를 가리켜요 */
const PROJECT_DETAILS: Project[] = [
  {
    id: 6,
    name: "두구두구",
    summary: "두드림 공지와 학사일정을 개인 맞춤 캘린더로 구독하는 서비스예요.",
    thumbnailUrl: "/projects/doogoo/1.webp",
    generationNumber: 3,
    purpose:
      "학사일정과 두드림 공지가 서로 다른 곳에 흩어져 있어 매번 사이트를 찾아가야 하고, 관심사대로 거르거나 캘린더에 넣기도 번거로워요. 공지를 자동으로 모으고 학과·키워드·학년 조건을 반영한 구독 주소를 발급해, 캘린더에서 자동으로 동기화되게 해요.",
    mainFunction:
      "학년 정보를 포함한 학사일정과 두드림 공지를 한곳에서 봐요\n필터 조건을 담은 구독 주소(ICS)를 발급해요\n구글·애플·아웃룩 캘린더에 자동으로 동기화돼요\n두드림 공지와 학사일정을 자동으로 수집해요\n두드림 공지를 학과·키워드 기준으로 분류하고 요약해요",
    siteUrl: "https://doogoodoogoo.kr/",
    frontendGithubUrl: "https://github.com/greedy-team/doogoo-fe",
    backendGithubUrl: "https://github.com/greedy-team/doogoo-be",
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "PostgreSQL", "OpenAI API"],
    screenshotUrls: screenshots("doogoo", 2),
    team: [
      { memberId: 1, name: "심혁", stackPosition: "FRONTEND" },
      { memberId: 2, name: "윤재홍", stackPosition: "FRONTEND" },
      { memberId: 3, name: "이고은", stackPosition: "BACKEND" },
      { memberId: 4, name: "강동현", stackPosition: "BACKEND" },
      { memberId: 5, name: "김태우", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 5,
    name: "MeetLink",
    summary: "최적의 모임 시간과 공평한 장소를 추천하는 서비스예요.",
    thumbnailUrl: "/projects/meetlink/thumb.webp",
    generationNumber: 3,
    purpose:
      "약속을 잡을 때 시간 조율은 여기저기 흩어져 있고, 장소가 특정 사람에게만 가까워 이동이 불공평해지기 쉬워요. 참여자들의 가능한 시간과 출발지를 모아 대중교통 이동시간과 기하중심을 계산해, 최적의 시간과 공평한 장소를 추천해요.",
    mainFunction:
      "고유 링크로 회원가입 없이 닉네임만으로 바로 참여해요\n드래그로 가능한 시간을 입력하고 카카오맵으로 출발지를 검색해요\n대중교통 이동시간과 기하중심으로 최적 시간과 공평한 장소를 추천해요\n추천 시간대를 요약 카드로 보여주고 지도로 시각화해요\n옵션을 실시간으로 바꾸고 세션을 복구해 다시 참여해요",
    siteUrl: "https://meetlink.now/",
    frontendGithubUrl: "https://github.com/greedy-team/meetlink-fe",
    backendGithubUrl: "https://github.com/greedy-team/meetlink-be",
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Kakao Maps API"],
    backendStack: ["Java", "Spring Boot", "JPA", "PostgreSQL", "Flyway", "MOTIS"],
    screenshotUrls: screenshots("meetlink", 4),
    team: [
      { memberId: 6, name: "강건", stackPosition: "FRONTEND" },
      { memberId: 7, name: "강예령", stackPosition: "FRONTEND" },
      { memberId: 8, name: "하수한", stackPosition: "BACKEND" },
      { memberId: 9, name: "서현진", stackPosition: "BACKEND" },
      { memberId: 10, name: "김하늘", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 4,
    name: "세종 줍줍",
    summary: "지도에서 잃어버린 물건을 찾아주는 분실물 서비스예요.",
    thumbnailUrl: "/projects/zupzup/1.webp",
    generationNumber: 2,
    purpose:
      "캠퍼스에서 잃어버린 물건은 에브리타임 글에 묻히기 쉬워요. 어디서 발견됐는지 한눈에 볼 방법이 없었어요. 분실물을 지도 위에 표시해 잃어버린 물건과 주인을 더 빠르게 이어줘요.",
    mainFunction:
      "지도에서 분실물 현황을 한눈에 보고 구역·카테고리별로 찾아봐요\n로그인 없이도 손쉽게 분실물을 등록해요\n분실물 인증 퀴즈로 주인을 확인해 악용을 막아요\n원하는 카테고리·장소를 등록하면 새 분실물을 메일로 알려줘요\n커피차·행사 부스 같은 학교 이벤트를 지도에서 확인해요 (개발 중)",
    siteUrl: "https://www.sejong-zupzup.kr/",
    frontendGithubUrl: "https://github.com/greedy-team/zup-zup-fe",
    backendGithubUrl: "https://github.com/greedy-team/zup-zup-be",
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "MySQL"],
    screenshotUrls: screenshots("zupzup", 6),
    team: [
      { memberId: 4, name: "강동현", stackPosition: "FRONTEND" },
      { memberId: 11, name: "임규영", stackPosition: "FRONTEND" },
      { memberId: 12, name: "박찬빈", stackPosition: "FRONTEND" },
      { memberId: 13, name: "이창희", stackPosition: "BACKEND" },
      { memberId: 14, name: "황혜림", stackPosition: "BACKEND" },
      { memberId: 15, name: "전서희", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 3,
    name: "슬기로운 세종생활",
    summary: "세종대 근처 장소 정보와 세종대생이 쓴 리뷰를 나누는 서비스예요.",
    thumbnailUrl: "/projects/sejong-life/1.webp",
    generationNumber: 2,
    purpose:
      "학교 주변이 익숙하지 않거나 자주 가는 곳이 한정된 세종대생은 분위기나 단체 가능 여부 같은 실용 정보를 얻기 어려워요. 세종대생만 장소와 리뷰를 남길 수 있게 해서, 세종대생이 함께 만드는 장소 서비스를 제공해요.",
    mainFunction:
      "주간 조회수 기반 상위 HOT Place를 보여줘요\n카테고리별로 장소를 거르고 찾아봐요\n상호명·사진·태그·위치와 리뷰 평점·분포를 확인해요\n세종대생만 사진·태그·평점·코멘트로 리뷰를 남겨요\n등록 장소나 직접 입력한 장소로 룰렛을 돌려 무작위 추천을 받아요",
    siteUrl: "https://sejong-life-fe.vercel.app/",
    frontendGithubUrl: "https://github.com/greedy-team/sejong-life-fe",
    backendGithubUrl: "https://github.com/greedy-team/sejong-life-be",
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Redis"],
    screenshotUrls: screenshots("sejong-life", 6),
    team: [
      { memberId: 16, name: "신지훈", stackPosition: "FRONTEND" },
      { memberId: 17, name: "정창우", stackPosition: "FRONTEND" },
      { memberId: 18, name: "신지우", stackPosition: "FRONTEND" },
      { memberId: 19, name: "허석준", stackPosition: "BACKEND" },
      { memberId: 20, name: "김지우", stackPosition: "BACKEND" },
      { memberId: 21, name: "염지환", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 2,
    name: "모꼬지",
    summary: "세종대학교 동아리 정보를 한곳에 모은 동아리 통합 플랫폼이에요.",
    thumbnailUrl: "/projects/mokkoji/thumb.webp",
    generationNumber: 1,
    purpose:
      "동아리는 에브리타임에 홍보글을 올려도 금방 묻혀 알리기 어렵고, 학우는 어떤 동아리가 있는지 한 번에 보기 어려워요. 흩어진 동아리 홍보와 정보 탐색을 한곳에 모아 풀어요.",
    mainFunction:
      "학술·공연·체육·봉사·종교 등 세종대 모든 동아리를 한곳에서 조회해요\n동아리 이름과 키워드로 검색해요\n동아리별 최신 모집 공고와 실시간 모집 현황을 보여줘요\n즐겨찾기하고 캘린더에서 모집 기한을 확인해요\n모집 마감을 메일로 알려줘요\n학사정보시스템 로그인으로 마이페이지를 관리해요",
    siteUrl: "https://www.mokkoji.site/",
    frontendGithubUrl: "https://github.com/greedy-team/mokkoji-fe-next",
    backendGithubUrl: "https://github.com/greedy-team/mokkoji-be",
    frontendStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Redis"],
    screenshotUrls: screenshots("mokkoji", 6),
    team: [
      { memberId: 22, name: "방재경", stackPosition: "FRONTEND" },
      { memberId: 23, name: "신혁수", stackPosition: "FRONTEND" },
      { memberId: 17, name: "정창우", stackPosition: "FRONTEND" },
      { memberId: 18, name: "신지우", stackPosition: "FRONTEND" },
      { memberId: 24, name: "김의진", stackPosition: "BACKEND" },
      { memberId: 25, name: "황승준", stackPosition: "BACKEND" },
      { memberId: 26, name: "안금서", stackPosition: "BACKEND" },
      { memberId: 27, name: "신혜빈", stackPosition: "BACKEND" },
      { memberId: 19, name: "허석준", stackPosition: "BACKEND" },
      { memberId: 28, name: "김성림", stackPosition: "DESIGN" },
    ],
  },
  {
    id: 1,
    name: "따라행",
    summary: "여행 브이로그 코스를 그대로 따라가는 여행 코스 추천 서비스예요.",
    thumbnailUrl: "/projects/ddarahang/1.webp",
    generationNumber: 1,
    purpose:
      "유튜브 여행 브이로그를 보며 '저 코스 그대로 가보고 싶다'는 마음은 들지만, 영상 속 장소를 일일이 찾아 정리하고 동선을 짜기는 번거로워요. 인기 여행 영상의 장소와 동선을 자동으로 정리해 바로 따라갈 수 있게 해줘요.",
    mainFunction:
      "조회수 1만 이상 인기 여행 영상을 분석해 장소 정보를 뽑아요\n장소명·키워드·태그(맛집·관광지·카페 등)로 정리해 목록으로 보여줘요\nDay1, Day2처럼 날짜별 동선을 지도와 함께 시각화해요\n지도에 핀으로 표시하고 구글맵·카카오맵으로 연결해요\n장소별 유튜브 원본 영상 썸네일과 링크를 함께 제공해요",
    frontendGithubUrl: "https://github.com/greedy-team/ddarahang-fe",
    backendGithubUrl: "https://github.com/greedy-team/ddarahang-be",
    frontendStack: ["React", "TypeScript"],
    backendStack: ["Java", "Spring Boot"],
    screenshotUrls: screenshots("ddarahang", 3),
    team: [
      { memberId: 29, name: "송혜정", stackPosition: "FRONTEND" },
      { memberId: 30, name: "김준수", stackPosition: "FRONTEND" },
      { memberId: 31, name: "정상희", stackPosition: "BACKEND" },
      { memberId: 32, name: "남해윤", stackPosition: "BACKEND" },
      { memberId: 16, name: "신지훈", stackPosition: "BACKEND" },
    ],
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

  http.get(`${API_BASE_URL}/projects`, () => {
    return HttpResponse.json({ items: PROJECT_SUMMARIES });
  }),

  http.get(`${API_BASE_URL}/projects/:id`, ({ params }) => {
    const project = PROJECT_DETAILS.find((item) => item.id === Number(params.id));
    if (!project) {
      return HttpResponse.json({ code: 40404, message: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    }
    return HttpResponse.json(project);
  }),
];
