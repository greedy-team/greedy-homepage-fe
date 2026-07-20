// 백엔드 API 응답 형태. 기준 스펙은 docs/openapi.yaml, 미해결 논의점은 docs/openapi-1차-대비-변경점.md §5.
// PROJECT_DTOS는 백엔드 배포 전까지 src/mocks/handlers.ts가 쓰는 MSW 픽스처예요.

export type ProjectStackPosition = "BACKEND" | "FRONTEND" | "FULL_STACK";

export type ProjectMemberDto = {
  memberId: number | null;
  name: string;
  stackPosition: ProjectStackPosition;
};

export type ProjectSummaryDto = {
  id: number;
  name: string;
  summary: string;
  thumbnailUrl: string | null;
  generationNumber: number;
};

export type ProjectDetailDto = ProjectSummaryDto & {
  purpose?: string;
  /** 문장 1개짜리 백엔드 필드. 지금 화면의 불릿 리스트(mainFunction)는 프론트 큐레이션이라 이 값은 안 씀. */
  mainFunction?: string;
  siteUrl: string | null;
  backendGithubUrl: string | null;
  frontendGithubUrl: string | null;
  // string[]로 받아요. 백엔드가 enum으로 주면 값·표시 라벨 확인 필요 — 논의점: 변경점 문서 §5-1.
  backendStack: string[];
  frontendStack: string[];
  imageUrls: string[];
  memberPreview: ProjectMemberDto[];
};

/** 슬러그(entities/project 기존 id) ↔ 백엔드 숫자 id. docs/openapi.yaml의 "id 1~6 고정 배정"과 한 몸이에요. */
export const PROJECT_SLUG_TO_BACKEND_ID: Record<string, number> = {
  ddarahang: 1,
  mokkoji: 2,
  "sejong-life": 3,
  zupzup: 4,
  doogoo: 5,
  meetlink: 6,
};

export const PROJECT_DTOS: ProjectDetailDto[] = [
  {
    id: 1,
    name: "따라행",
    summary:
      "인기 여행 유튜브 영상을 분석해 실제 여행 동선과 장소 정보를 정리하고, 지도와 함께 일정별 여행 코스를 추천해주는 서비스.",
    generationNumber: 1,
    thumbnailUrl: null,
    siteUrl: null,
    frontendGithubUrl: null,
    backendGithubUrl: null,
    purpose:
      '여행 브이로그를 보고 "저 코스 그대로 가보고 싶다"는 생각은 들지만, 영상 속 장소와 동선을 일일이 찾아 정리하는 건 번거로웠어요.',
    mainFunction:
      "인기 여행 영상을 분석해 등장한 장소와 이동 순서를 뽑아내고, 지도 위에 일정별 코스로 묶어 보여줘요.",
    imageUrls: [],
    frontendStack: [],
    backendStack: [],
    memberPreview: [
      { memberId: 6, name: "송혜정", stackPosition: "FRONTEND" },
      { memberId: 7, name: "김준수", stackPosition: "FRONTEND" },
      { memberId: 10, name: "정상희", stackPosition: "BACKEND" },
      { memberId: 11, name: "남해윤", stackPosition: "BACKEND" },
      { memberId: 13, name: "신지훈", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 2,
    name: "모꼬지",
    summary:
      "동아리 홍보와 정보 탐색의 불편함을 해결하는 세종대 동아리 통합 서비스. 동아리 검색, 실시간 모집 공고, 즐겨찾기·캘린더, 모집 알림 메일 등을 제공.",
    generationNumber: 1,
    thumbnailUrl: null,
    siteUrl: "https://www.mokkoji.site/",
    frontendGithubUrl: "https://github.com/greedy-team/mokkoji-fe-next",
    backendGithubUrl: "https://github.com/greedy-team/mokkoji-be",
    purpose:
      "세종대에는 동아리가 많지만 모집 정보가 에브리타임·인스타·오픈채팅에 흩어져 있어, 어떤 동아리가 언제 뽑는지 한눈에 보기 어려웠어요.",
    mainFunction: "동아리를 카테고리로 검색하고, 실시간 모집 공고를 모아 봐요.",
    imageUrls: [],
    frontendStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "MySQL", "Redis"],
    memberPreview: [
      { memberId: null, name: "방재경", stackPosition: "FRONTEND" },
      { memberId: null, name: "신혁수", stackPosition: "FRONTEND" },
      { memberId: 16, name: "정창우", stackPosition: "FRONTEND" },
      { memberId: 15, name: "신지우", stackPosition: "FRONTEND" },
      { memberId: 14, name: "김의진", stackPosition: "BACKEND" },
      { memberId: 12, name: "황승준", stackPosition: "BACKEND" },
      { memberId: 9, name: "안금서", stackPosition: "BACKEND" },
      { memberId: 8, name: "신혜빈", stackPosition: "BACKEND" },
      { memberId: 21, name: "허석준", stackPosition: "BACKEND" },
      // 외부 디자이너(김성림)는 확정 제외 — StackPosition에 DESIGN 없음.
    ],
  },
  {
    id: 3,
    name: "슬기로운 세종생활",
    summary:
      "세종대 근처 장소 정보와 세종대생이 직접 작성한 리뷰를 제공하는 서비스. 장소 선정과 리뷰 작성은 세종대생만 기여할 수 있다.",
    generationNumber: 2,
    thumbnailUrl: null,
    siteUrl: "https://sejong-life-fe.vercel.app",
    frontendGithubUrl: "https://github.com/greedy-team/sejong-life-fe",
    backendGithubUrl: "https://github.com/greedy-team/sejong-life-be",
    purpose: "세종대 근처 맛집·카페·공부 장소 정보는 흩어져 있고, 정작 세종대생에게 맞는 솔직한 후기는 찾기 어려웠어요.",
    mainFunction: "세종대 근처 장소를 카테고리로 둘러보고, 세종대생이 직접 남긴 리뷰를 확인해요.",
    imageUrls: [],
    frontendStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Storybook"],
    backendStack: ["Java", "Spring Boot"],
    memberPreview: [
      { memberId: 13, name: "신지훈", stackPosition: "FRONTEND" },
      { memberId: 16, name: "정창우", stackPosition: "FRONTEND" },
      { memberId: 15, name: "신지우", stackPosition: "FRONTEND" },
      { memberId: 21, name: "허석준", stackPosition: "BACKEND" },
      { memberId: 24, name: "김지우", stackPosition: "BACKEND" },
      { memberId: 25, name: "염지환", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 4,
    name: "세종 줍줍",
    summary:
      "세종대학교 구성원을 위한 지도 기반 분실물 찾기 웹 서비스. 캠퍼스 내 분실물을 지도 위에 표시해 잃어버린 물건과 주인을 빠르게 이어준다.",
    generationNumber: 2,
    thumbnailUrl: null,
    siteUrl: "https://www.sejong-zupzup.kr",
    frontendGithubUrl: "https://github.com/greedy-team/zup-zup-fe",
    backendGithubUrl: "https://github.com/greedy-team/zup-zup-be",
    purpose:
      "캠퍼스에서 물건을 잃어버리면 어디에 습득물이 모이는지 알기 어렵고, 학교 커뮤니티 글은 금방 묻혀 주인을 찾기 힘들었어요.",
    mainFunction: "분실물을 주운 위치를 지도 위에 표시하고, 잃어버린 사람은 지도에서 바로 확인해요.",
    imageUrls: [],
    frontendStack: ["React", "TypeScript", "Zustand", "Axios", "Leaflet", "Tailwind CSS"],
    backendStack: ["Spring Boot", "MySQL", "Redis"],
    memberPreview: [
      { memberId: 18, name: "강동현", stackPosition: "FRONTEND" },
      { memberId: 17, name: "임규영", stackPosition: "FRONTEND" },
      { memberId: 19, name: "박찬빈", stackPosition: "FRONTEND" },
      { memberId: 23, name: "이창희", stackPosition: "BACKEND" },
      { memberId: 20, name: "황혜림", stackPosition: "BACKEND" },
      { memberId: 22, name: "전서희", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 5,
    name: "두구두구",
    summary:
      "두드림 비교과 공지와 학사일정을 자동으로 모아, 학과·키워드·학년 조건이 반영된 나만의 캘린더 구독 링크를 발급해주는 서비스.",
    generationNumber: 3,
    thumbnailUrl: null,
    siteUrl: "https://doogoodoogoo.kr/",
    frontendGithubUrl: "https://github.com/greedy-team/doogoo-fe",
    backendGithubUrl: "https://github.com/greedy-team/doogoo-be",
    purpose: "두드림 비교과 공지와 학사일정은 여러 페이지에 흩어져 있어, 관심 있는 프로그램과 일정을 놓치기 쉬웠어요.",
    mainFunction: "두드림 공지와 학사일정을 자동으로 모아, 학과·키워드·학년 조건으로 걸러줘요.",
    imageUrls: [],
    frontendStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "TanStack Query"],
    backendStack: ["Java", "Spring Boot", "PostgreSQL"],
    memberPreview: [
      { memberId: 27, name: "심혁", stackPosition: "FRONTEND" },
      { memberId: 26, name: "윤재홍", stackPosition: "FRONTEND" },
      { memberId: 30, name: "이고은", stackPosition: "BACKEND" },
      { memberId: 18, name: "강동현", stackPosition: "BACKEND" },
      { memberId: 32, name: "김태우", stackPosition: "BACKEND" },
    ],
  },
  {
    id: 6,
    name: "MeetLink",
    summary: "여러 사람의 일정과 출발지를 모아, 모두에게 가장 알맞은 모임 시간과 공평한 모임 장소를 추천해주는 서비스.",
    generationNumber: 3,
    thumbnailUrl: null,
    siteUrl: "https://meetlink.now",
    frontendGithubUrl: "https://github.com/greedy-team/meetlink-fe",
    backendGithubUrl: "https://github.com/greedy-team/meetlink-be",
    purpose: "여러 명이 모일 때 서로 되는 시간과 출발지가 달라, 약속 시간과 장소를 정하는 데만 한참을 소모했어요.",
    mainFunction: "참여자들의 가능한 시간과 출발지를 모아, 모두에게 가장 알맞은 모임 시간과 공평한 중간 지점을 추천해줘요.",
    imageUrls: [],
    frontendStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Zustand", "Kakao Maps API"],
    backendStack: ["Java", "Spring Boot", "PostgreSQL"],
    memberPreview: [
      { memberId: 28, name: "강건", stackPosition: "FRONTEND" },
      { memberId: 29, name: "강예령", stackPosition: "FRONTEND" },
      { memberId: 31, name: "하수한", stackPosition: "BACKEND" },
      { memberId: 33, name: "서현진", stackPosition: "BACKEND" },
      { memberId: 34, name: "김하늘", stackPosition: "BACKEND" },
    ],
  },
];
