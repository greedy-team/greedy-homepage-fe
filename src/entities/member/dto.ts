// 백엔드 확정 API 응답 형태(그리디 허브 마이그레이션 레포 docs/openapi.yaml, docs/backend-api-spec.md §1 기준).
//
// ⚠️ Project와 달리 Member는 자동 병합할 수 있는 범위가 좁다. 지금 화면의 role·history·intro는
// 백엔드 enum(MemberActivityType)보다 훨씬 풍부한 큐레이션 콘텐츠라서:
// - "회장"·"영입리드" 같은 직함은 MemberActivityType에 없음(동아리장 enum 미확정 — 추후 요청 예정)
// - 기수별 트랙 변경 이력(예: 2기 FE → 3기 BE)은 mainStackPosition이 "현재값 1개"만 줘서 복원 불가
//   (MemberActivity.stackPosition 추후 요청 예정)
// 그래서 지금은 githubUrl·imageUrl처럼 손실 없이 그대로 대체 가능한 필드만 병합하고,
// role·affiliation·cohorts·tracks·history·intro는 큐레이션 그대로 유지한다.

export type MemberStackPosition = "BACKEND" | "FRONTEND" | "FULL_STACK";
export type MemberActivityType = "CO_FOUNDER" | "MAINTAINER" | "STUDY_LEAD" | "STUDY_MEMBER" | "REVIEWER";
export type MemberDepartment = "COMPUTER_SCIENCE" | "SOFTWARE" | "INFO_COMMUNICATION" | "AI" | "ETC";

export type MemberActivityDto = {
  activityType: MemberActivityType;
  generationNumber: number | null;
};

export type MemberDto = {
  id: number;
  name: string;
  githubUrl: string | null;
  imageUrl: string | null;
  mainStackPosition: MemberStackPosition;
  departments: MemberDepartment[];
  memberActivities: MemberActivityDto[];
};

// 💡 활용 기회: 실제 swagger의 MemberDetail(GET /members/{id})엔 이 타입에 아직 없는 필드가 둘 더 있다.
// - description(자기소개): 지금 화면의 intro는 전부 임시 큐레이션 문구인데, 본인이 직접 쓸 수 있는
//   진짜 필드가 이미 있다. 로그인 자기편집(Phase 2) 붙을 때 이걸로 교체 가능.
// - teamProjects(참여 프로젝트): app/members/[id]/page.tsx의 getMemberProjects()가 지금 프로젝트
//   전체를 불러와서 이름으로 하나하나 대조하는데, 이 필드를 쓰면 백엔드가 이미 join해서 주니까
//   그 함수 전체가 필요 없어진다. 지금은 범위 밖이라 안 붙였을 뿐, MemberDto에 추가하면 바로 쓸 수 있다.

/**
 * MSW 목서버가 돌려주는 픽스처 데이터. 실제 그리디 46명 명단(그리디 허브 마이그레이션 레포
 * src/mocks/data/members.ts, 노션 "그리디 멤버 최종 정리" 기준)을 이 레포의 MemberDto 형태로 옮겼어요.
 * description·teamProjects는 원본에 있었지만 지금 merge 로직이 아직 안 써서 뺐어요.
 */
export const MEMBER_DTOS: MemberDto[] = [
  {
    id: 1,
    name: "이승용",
    githubUrl: "https://github.com/kokodak",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "CO_FOUNDER", generationNumber: null },
      { activityType: "MAINTAINER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 1 },
      { activityType: "REVIEWER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 3 },
    ],
  },
  {
    id: 2,
    name: "원태연",
    githubUrl: "https://github.com/TaeyeonRoyce",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "CO_FOUNDER", generationNumber: null },
      { activityType: "MAINTAINER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 1 },
      { activityType: "REVIEWER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 2 },
    ],
  },
  {
    id: 3,
    name: "김수민",
    githubUrl: "https://github.com/boyekim",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "CO_FOUNDER", generationNumber: null },
      { activityType: "MAINTAINER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 4,
    name: "김범수",
    githubUrl: "https://github.com/Indigochi1d",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "CO_FOUNDER", generationNumber: null },
      { activityType: "MAINTAINER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 1 },
      { activityType: "REVIEWER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 5,
    name: "김주환",
    githubUrl: "https://github.com/3Juhwan",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "CO_FOUNDER", generationNumber: null },
      { activityType: "MAINTAINER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 1 },
      { activityType: "REVIEWER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
    ],
  },
  {
    id: 6,
    name: "송혜정",
    githubUrl: "https://github.com/Songhyejeong",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 3 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 7,
    name: "김준수",
    githubUrl: "https://github.com/gogo1414",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
    ],
  },
  {
    id: 8,
    name: "신혜빈",
    githubUrl: "https://github.com/c0mpuTurtle",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 9,
    name: "안금서",
    githubUrl: "https://github.com/goldm0ng",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
    ],
  },
  {
    id: 10,
    name: "정상희",
    githubUrl: "https://github.com/SANGHEEJEONG",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "STUDY_LEAD", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
    ],
  },
  {
    id: 11,
    name: "남해윤",
    githubUrl: "https://github.com/haeyoon1",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "MAINTAINER", generationNumber: 3 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 12,
    name: "황승준",
    githubUrl: "https://github.com/davidolleh",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
    ],
  },
  {
    id: 13,
    name: "신지훈",
    githubUrl: "https://github.com/developowl",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["INFO_COMMUNICATION"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 3 },
    ],
  },
  {
    id: 14,
    name: "김의진",
    githubUrl: "https://github.com/sansan20535",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 1 },
    ],
  },
  {
    id: 15,
    name: "신지우",
    githubUrl: "https://github.com/zldn109",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
    ],
  },
  {
    id: 16,
    name: "정창우",
    githubUrl: "https://github.com/ChangwooJ",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["INFO_COMMUNICATION"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 17,
    name: "임규영",
    githubUrl: "https://github.com/gxuoo",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 18,
    name: "강동현",
    githubUrl: "https://github.com/mintcoke123",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 19,
    name: "박찬빈",
    githubUrl: "https://github.com/INSANE-P",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "STUDY_LEAD", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 20,
    name: "황혜림",
    githubUrl: "https://github.com/HyerimH",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "MAINTAINER", generationNumber: 4 },
    ],
  },
  {
    id: 21,
    name: "허석준",
    githubUrl: "https://github.com/gjtjrl303",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
    ],
  },
  {
    id: 22,
    name: "전서희",
    githubUrl: "https://github.com/jeonseohee9",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
    ],
  },
  {
    id: 23,
    name: "이창희",
    githubUrl: "https://github.com/chxghee",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 24,
    name: "김지우",
    githubUrl: "https://github.com/Ji-Woo-Kim",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
    ],
  },
  {
    id: 25,
    name: "염지환",
    githubUrl: "https://github.com/JihwanYeom",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 2 },
    ],
  },
  {
    id: 26,
    name: "윤재홍",
    githubUrl: "https://github.com/yoonjaehong26",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
    ],
  },
  {
    id: 27,
    name: "심혁",
    githubUrl: "https://github.com/johncakes",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "STUDY_LEAD", generationNumber: 4 },
    ],
  },
  {
    id: 28,
    name: "강건",
    githubUrl: "https://github.com/dkr-sjr",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 29,
    name: "강예령",
    githubUrl: "https://github.com/ehlung",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 30,
    name: "이고은",
    githubUrl: "https://github.com/ke-62",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 31,
    name: "하수한",
    githubUrl: "https://github.com/chemistryx",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 32,
    name: "김태우",
    githubUrl: "https://github.com/tae-wooo",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 33,
    name: "서현진",
    githubUrl: "https://github.com/nonactress",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 34,
    name: "김하늘",
    githubUrl: "https://github.com/kimsky247-coder",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["INFO_COMMUNICATION"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 3 },
    ],
  },
  {
    id: 35,
    name: "김민기",
    githubUrl: "https://github.com/supernovaMK",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["SOFTWARE"],
    memberActivities: [
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 36,
    name: "이진",
    githubUrl: "https://github.com/2Jin1031",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC", "COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "MAINTAINER", generationNumber: 4 },
      { activityType: "REVIEWER", generationNumber: 4 },
    ],
  },
  {
    id: 37,
    name: "홍의민",
    githubUrl: "https://github.com/EM-H20",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 38,
    name: "김동건",
    githubUrl: "https://github.com/rahwan10",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 39,
    name: "고규민",
    githubUrl: "https://github.com/kokunut",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 40,
    name: "천동현",
    githubUrl: "https://github.com/realcdh",
    imageUrl: null,
    mainStackPosition: "FRONTEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 41,
    name: "김민욱",
    githubUrl: "https://github.com/hapdaypy",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 42,
    name: "강대현",
    githubUrl: "https://github.com/Kdahyn",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 43,
    name: "정명준",
    githubUrl: "https://github.com/htdufhc-bit",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 44,
    name: "이채현",
    githubUrl: "https://github.com/chaehyunL",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["AI"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 45,
    name: "김하은",
    githubUrl: "https://github.com/haeun92e0",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["ETC", "COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
  {
    id: 46,
    name: "이태규",
    githubUrl: "https://github.com/Cappucciyes",
    imageUrl: null,
    mainStackPosition: "BACKEND",
    departments: ["COMPUTER_SCIENCE"],
    memberActivities: [
      { activityType: "STUDY_MEMBER", generationNumber: 4 },
    ],
  },
];
