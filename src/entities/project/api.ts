// 팀 프로젝트 데이터. 지금은 정적 데이터를 반환하고, API 명세가 확정되면
// 이 함수 안만 fetch(ISR)로 바꿔요. 정렬(최신 기수 우선)도 서버로 옮겨갈 수 있어요.
//
// 문구는 사이트 말투(해요체)에 맞췄고, 기술 스택은 핵심(언어·프레임워크·DB·주요 라이브러리)만 추렸어요.
import type { Project, ProjectSummary } from "./model";

/** public/projects/<id>/1.webp부터 순서대로. 화면 이미지는 각 팀 레포 README에서 가져왔고, 두구두구는 배포 사이트 화면이에요 */
function shots(id: string, count: number) {
  return Array.from({ length: count }, (_, index) => `/projects/${id}/${index + 1}.webp`);
}

const PROJECTS: Project[] = [
  {
    id: "doogoo",
    name: "두구두구",
    cohort: "3기",
    summary: "두드림 공지와 학사일정을 개인 맞춤 캘린더로 구독하는 서비스예요.",
    purpose:
      "학사일정과 두드림 공지가 서로 다른 곳에 흩어져 있어 매번 사이트를 찾아가야 하고, 관심사대로 거르거나 캘린더에 넣기도 번거로워요. 공지를 자동으로 모으고 학과·키워드·학년 조건을 반영한 구독 주소를 발급해, 캘린더에서 자동으로 동기화되게 해요.",
    mainFunction: [
      "학년 정보를 포함한 학사일정과 두드림 공지를 한곳에서 봐요",
      "필터 조건을 담은 구독 주소(ICS)를 발급해요",
      "구글·애플·아웃룩 캘린더에 자동으로 동기화돼요",
      "두드림 공지와 학사일정을 자동으로 수집해요",
      "두드림 공지를 학과·키워드 기준으로 분류하고 요약해요",
    ],
    siteUrl: "https://doogoodoogoo.kr/",
    frontendGithubUrl: "https://github.com/greedy-team/doogoo-fe",
    backendGithubUrl: "https://github.com/greedy-team/doogoo-be",
    thumbnailUrl: "/projects/doogoo/1.webp",
    imageUrls: shots("doogoo", 2),
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "PostgreSQL", "OpenAI API"],
    members: [
      { name: "심혁", position: "FE" },
      { name: "윤재홍", position: "FE" },
      { name: "이고은", position: "BE" },
      { name: "강동현", position: "BE" },
      { name: "김태우", position: "BE" },
    ],
  },
  {
    id: "meetlink",
    name: "MeetLink",
    cohort: "3기",
    summary: "최적의 모임 시간과 공평한 장소를 추천하는 서비스예요.",
    purpose:
      "약속을 잡을 때 시간 조율은 여기저기 흩어져 있고, 장소가 특정 사람에게만 가까워 이동이 불공평해지기 쉬워요. 참여자들의 가능한 시간과 출발지를 모아 대중교통 이동시간과 기하중심을 계산해, 최적의 시간과 공평한 장소를 추천해요.",
    mainFunction: [
      "고유 링크로 회원가입 없이 닉네임만으로 바로 참여해요",
      "드래그로 가능한 시간을 입력하고 카카오맵으로 출발지를 검색해요",
      "대중교통 이동시간과 기하중심으로 최적 시간과 공평한 장소를 추천해요",
      "추천 시간대를 요약 카드로 보여주고 지도로 시각화해요",
      "옵션을 실시간으로 바꾸고 세션을 복구해 다시 참여해요",
    ],
    siteUrl: "https://meetlink.now/",
    frontendGithubUrl: "https://github.com/greedy-team/meetlink-fe",
    backendGithubUrl: "https://github.com/greedy-team/meetlink-be",
    // 세로 화면은 16:9 크롭이 어색해서, 폰 화면 두 장을 나란히 둔 전용 썸네일을 써요
    thumbnailUrl: "/projects/meetlink/thumb.webp",
    imageUrls: shots("meetlink", 4),
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Kakao Maps API"],
    backendStack: ["Java", "Spring Boot", "JPA", "PostgreSQL", "Flyway", "MOTIS"],
    members: [
      { name: "강건", position: "FE" },
      { name: "강예령", position: "FE" },
      { name: "하수한", position: "BE" },
      { name: "서현진", position: "BE" },
      { name: "김하늘", position: "BE" },
    ],
  },
  {
    id: "zupzup",
    name: "세종 줍줍",
    cohort: "2기",
    summary: "지도에서 잃어버린 물건을 찾아주는 분실물 서비스예요.",
    purpose:
      "캠퍼스에서 잃어버린 물건은 에브리타임 글에 묻히기 쉬워요. 어디서 발견됐는지 한눈에 볼 방법이 없었어요. 분실물을 지도 위에 표시해 잃어버린 물건과 주인을 더 빠르게 이어줘요.",
    mainFunction: [
      "지도에서 분실물 현황을 한눈에 보고 구역·카테고리별로 찾아봐요",
      "로그인 없이도 손쉽게 분실물을 등록해요",
      "분실물 인증 퀴즈로 주인을 확인해 악용을 막아요",
      "원하는 카테고리·장소를 등록하면 새 분실물을 메일로 알려줘요",
      "커피차·행사 부스 같은 학교 이벤트를 지도에서 확인해요 (개발 중)",
    ],
    siteUrl: "https://www.sejong-zupzup.kr/",
    frontendGithubUrl: "https://github.com/greedy-team/zup-zup-fe",
    backendGithubUrl: "https://github.com/greedy-team/zup-zup-be",
    thumbnailUrl: "/projects/zupzup/1.webp",
    imageUrls: shots("zupzup", 6),
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Zustand", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "MySQL"],
    members: [
      { name: "강동현", position: "FE" },
      { name: "임규영", position: "FE" },
      { name: "박찬빈", position: "FE" },
      { name: "이창희", position: "BE" },
      { name: "황혜림", position: "BE" },
      { name: "전서희", position: "BE" },
    ],
  },
  {
    id: "sejong-life",
    name: "슬기로운 세종생활",
    cohort: "2기",
    summary: "세종대 근처 장소 정보와 세종대생이 쓴 리뷰를 나누는 서비스예요.",
    purpose:
      "학교 주변이 익숙하지 않거나 자주 가는 곳이 한정된 세종대생은 분위기나 단체 가능 여부 같은 실용 정보를 얻기 어려워요. 세종대생만 장소와 리뷰를 남길 수 있게 해서, 세종대생이 함께 만드는 장소 서비스를 제공해요.",
    mainFunction: [
      "주간 조회수 기반 상위 HOT Place를 보여줘요",
      "카테고리별로 장소를 거르고 찾아봐요",
      "상호명·사진·태그·위치와 리뷰 평점·분포를 확인해요",
      "세종대생만 사진·태그·평점·코멘트로 리뷰를 남겨요",
      "등록 장소나 직접 입력한 장소로 룰렛을 돌려 무작위 추천을 받아요",
    ],
    siteUrl: "https://sejong-life-fe.vercel.app/",
    frontendGithubUrl: "https://github.com/greedy-team/sejong-life-fe",
    backendGithubUrl: "https://github.com/greedy-team/sejong-life-be",
    thumbnailUrl: "/projects/sejong-life/1.webp",
    imageUrls: shots("sejong-life", 6),
    frontendStack: ["React", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Redis"],
    members: [
      { name: "신지훈", position: "FE" },
      { name: "정창우", position: "FE" },
      { name: "신지우", position: "FE" },
      { name: "허석준", position: "BE" },
      { name: "김지우", position: "BE" },
      { name: "염지환", position: "BE" },
    ],
  },
  {
    id: "mokkoji",
    name: "모꼬지",
    cohort: "1기",
    summary: "세종대학교 동아리 정보를 한곳에 모은 동아리 통합 플랫폼이에요.",
    purpose:
      "동아리는 에브리타임에 홍보글을 올려도 금방 묻혀 알리기 어렵고, 학우는 어떤 동아리가 있는지 한 번에 보기 어려워요. 흩어진 동아리 홍보와 정보 탐색을 한곳에 모아 풀어요.",
    mainFunction: [
      "학술·공연·체육·봉사·종교 등 세종대 모든 동아리를 한곳에서 조회해요",
      "동아리 이름과 키워드로 검색해요",
      "동아리별 최신 모집 공고와 실시간 모집 현황을 보여줘요",
      "즐겨찾기하고 캘린더에서 모집 기한을 확인해요",
      "모집 마감을 메일로 알려줘요",
      "학사정보시스템 로그인으로 마이페이지를 관리해요",
    ],
    siteUrl: "https://www.mokkoji.site/",
    frontendGithubUrl: "https://github.com/greedy-team/mokkoji-fe-next",
    backendGithubUrl: "https://github.com/greedy-team/mokkoji-be",
    // 대표는 검색 히어로를 16:9로 잘라 쓴 전용 썸네일이에요
    thumbnailUrl: "/projects/mokkoji/thumb.webp",
    imageUrls: shots("mokkoji", 6),
    frontendStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backendStack: ["Java", "Spring Boot", "JPA", "QueryDSL", "MySQL", "Redis"],
    members: [
      { name: "방재경", position: "FE", external: true },
      { name: "신혁수", position: "FE", external: true },
      { name: "정창우", position: "FE" },
      { name: "신지우", position: "FE" },
      { name: "김의진", position: "BE" },
      { name: "황승준", position: "BE" },
      { name: "안금서", position: "BE" },
      { name: "신혜빈", position: "BE" },
      { name: "허석준", position: "BE" },
      { name: "김성림", position: "디자인", external: true },
    ],
  },
  {
    id: "ddarahang",
    name: "따라행",
    cohort: "1기",
    summary: "여행 브이로그 코스를 그대로 따라가는 여행 코스 추천 서비스예요.",
    purpose:
      "유튜브 여행 브이로그를 보며 '저 코스 그대로 가보고 싶다'는 마음은 들지만, 영상 속 장소를 일일이 찾아 정리하고 동선을 짜기는 번거로워요. 인기 여행 영상의 장소와 동선을 자동으로 정리해 바로 따라갈 수 있게 해줘요.",
    mainFunction: [
      "조회수 1만 이상 인기 여행 영상을 분석해 장소 정보를 뽑아요",
      "장소명·키워드·태그(맛집·관광지·카페 등)로 정리해 목록으로 보여줘요",
      "Day1, Day2처럼 날짜별 동선을 지도와 함께 시각화해요",
      "지도에 핀으로 표시하고 구글맵·카카오맵으로 연결해요",
      "장소별 유튜브 원본 영상 썸네일과 링크를 함께 제공해요",
    ],
    // 배포가 중단돼서 siteUrl은 두지 않아요 (서비스 버튼이 죽은 링크로 가지 않게).
    frontendGithubUrl: "https://github.com/greedy-team/ddarahang-fe",
    backendGithubUrl: "https://github.com/greedy-team/ddarahang-be",
    thumbnailUrl: "/projects/ddarahang/1.webp",
    imageUrls: shots("ddarahang", 3),
    // 비공개 레포라 README·언어 구성으로 확인 가능한 범위까지만 적었어요.
    frontendStack: ["React", "TypeScript"],
    backendStack: ["Java", "Spring Boot"],
    members: [
      { name: "송혜정", position: "FE" },
      { name: "김준수", position: "FE" },
      { name: "정상희", position: "BE" },
      { name: "남해윤", position: "BE" },
      { name: "신지훈", position: "BE" },
    ],
  },
];

/** 최신 기수부터. 목록·상세의 정렬 기준이에요 */
const COHORT_ORDER = ["4기", "3기", "2기", "1기"];

function byCohortDesc(a: ProjectSummary, b: ProjectSummary) {
  return COHORT_ORDER.indexOf(a.cohort) - COHORT_ORDER.indexOf(b.cohort);
}

function toSummary(project: Project): ProjectSummary {
  const { id, name, cohort, summary, thumbnailUrl } = project;
  return { id, name, cohort, summary, thumbnailUrl };
}

/** 프로젝트 페이지 목록. 최신 기수부터 보여줘요 */
export async function getProjects(): Promise<ProjectSummary[]> {
  // TODO: 백엔드 API 연동 (프로젝트는 서버에서 관리)
  return [...PROJECTS].map(toSummary).sort(byCohortDesc);
}

/** 상세 한 건. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getProject(id: string): Promise<Project | undefined> {
  return PROJECTS.find((project) => project.id === id);
}

/** 필터에 쓰는 기수 목록. 프로젝트가 아직 없는 현재 기수(4기)도 넣어 빈 상태를 보여줘요 */
export async function getCohorts(): Promise<string[]> {
  return COHORT_ORDER;
}

/** 랜딩 캐러셀에 쓰는 대표 프로젝트. 최신 기수부터 보여줘요 */
export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  return [...PROJECTS].map(toSummary).sort(byCohortDesc);
}
