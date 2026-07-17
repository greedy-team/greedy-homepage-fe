// 스터디 페이지 문구와 커리큘럼. 서버에서 오지 않고 직접 고치는 콘텐츠예요.
// 요일과 마감 시각은 들어온 뒤 공지로 알면 되는 운영 정보라 사이트에는 쓰지 않아요.

export const PAGE = {
  title: "스터디",
  subtitle: "매주 미션을 만들고, 리뷰로 다듬으며 성장해요.",
  note: "커리큘럼은 기수마다 조금씩 달라져요. 4기 기준이에요.",
} as const;

/** 한 주가 굴러가는 리듬. 두 트랙이 같아요. */
export const WEEK_RHYTHM = [
  { title: "미션 받기", description: "매주 새 미션이 올라와요" },
  { title: "구현", description: "각자 구현해서 PR을 올려요" },
  { title: "티키타카 리뷰", description: "리뷰어와 며칠간 주고받으며 다듬어요" },
  { title: "머지", description: "리뷰가 끝나면 머지하고 다음 미션으로 넘어가요" },
] as const;

export type CurriculumPhase = {
  /** 주차 범위 (예: "1~3주차") */
  weeks: string;
  title: string;
  /** 그 기간에 만드는 미션 */
  mission: string;
  description: string;
};

export type Track = {
  value: string;
  label: string;
  title: string;
  description: string;
  skills: string[];
  curriculum: CurriculumPhase[];
};

export const TRACKS: Track[] = [
  {
    value: "frontend",
    label: "프론트엔드",
    title: "프론트엔드 트랙",
    description:
      "사용자가 보고 만지는 화면을 만들어요. 자바스크립트 3주와 리액트 11주, 총 14주 미션을 지나면 서버에서 렌더링하는 방법까지 다루게 돼요. 초록스터디 자료와 그리디가 직접 만든 자료로 진행해요.",
    skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "협업과 Git"],
    curriculum: [
      {
        weeks: "1~3주차",
        title: "자바스크립트 기초",
        mission: "숫자 야구, 탐욕의 룰렛, 좀비 게임",
        description: "프레임워크 없이 자바스크립트만으로 게임을 만들며 기본기를 다져요.",
      },
      {
        weeks: "4~5주차",
        title: "리액트 기초",
        mission: "self-paced-react Step 1~5",
        description: "컴포넌트와 상태, 데이터 흐름을 익히고 API 연결까지 해봐요.",
      },
      {
        weeks: "6~9주차",
        title: "리액트 심화",
        mission: "self-paced-react-advanced",
        description: "Context, Zustand, Tanstack Query로 상태 관리의 폭을 넓혀요.",
      },
      {
        weeks: "10~12주차",
        title: "자유 미션",
        mission: "무엇이든 만들어보세요",
        description: "라우팅, 접근성, 테스트를 챙기며 원하는 것을 만들어요.",
      },
      {
        weeks: "13~14주차",
        title: "SSR 전환",
        mission: "리액트 포켓몬 도감",
        description: "만든 앱을 서버에서 렌더링하도록 옮기며 동작 원리를 이해해요.",
      },
    ],
  },
  {
    value: "backend",
    label: "백엔드",
    title: "백엔드 트랙",
    description:
      "화면 뒤에서 데이터를 다루는 서버를 만들어요. 자바 5주와 스프링 9주, 총 14주 미션을 지나면 인증부터 배포까지 직접 해보게 돼요. 초록스터디 자료와 그리디가 직접 만든 자료로 진행해요.",
    skills: ["Java", "객체지향", "Spring Boot", "JPA와 DB", "협업과 Git"],
    curriculum: [
      {
        weeks: "1~5주차",
        title: "자바 기초",
        mission: "자동차 경주, 로또, 사다리",
        description: "객체지향 설계를 미션으로 연습하며 자바 기본기를 다져요.",
      },
      {
        weeks: "6~8주차",
        title: "스프링 입문",
        mission: "Spring MVC, JDBC",
        description: "웹 요청이 처리되는 흐름을 만들고 데이터베이스를 연결해요.",
      },
      {
        weeks: "9~11주차",
        title: "코어와 인증",
        mission: "Spring Core, MVC 인증",
        description: "스프링이 객체를 관리하는 방식을 이해하고 로그인 인증을 구현해요.",
      },
      {
        weeks: "12~13주차",
        title: "JPA",
        mission: "Spring JPA",
        description: "ORM으로 데이터를 다루는 방법을 익혀요.",
      },
      {
        weeks: "14주차",
        title: "배포",
        mission: "서비스 배포",
        description: "만든 서버를 실제 환경에 올리며 한 학기를 마무리해요.",
      },
    ],
  },
];
