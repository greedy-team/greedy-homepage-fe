import { fetchJson, fetchList } from "@/shared/api/fetch";
import type { ExternalReviewer, Member, MemberAction, MemberSummary, StackPosition } from "./model";

const REVALIDATE_SECONDS = 60 * 60;

/** 내부 멤버 목록 */
export async function getMembers(): Promise<MemberSummary[]> {
  return fetchList<MemberSummary>("/members", REVALIDATE_SECONDS);
}

/** 상세 프로필. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getMember(id: string): Promise<Member | undefined> {
  return fetchJson<Member>(`/members/${id}`, REVALIDATE_SECONDS);
}

// TODO: 백엔드에 ExternalMember 조회 API + 기수 연결 테이블 + 내부 멤버와 같은 API/id 체계로
// 노출 요청이 되면 fetch로 바꿔요. 그 전까지는 정적 데이터인데, memberActions 모양은
// 이상적인(백엔드가 앞으로 줄) 모양으로 미리 맞춰뒀어요(role은 항상 REVIEWER 고정).
function reviewerActions(stackPosition: StackPosition, generations: number[]): MemberAction[] {
  return generations.map((generationNumber) => ({ memberRole: "REVIEWER", stackPosition, generationNumber }));
}

const EXTERNAL_REVIEWERS: ExternalReviewer[] = [
  {
    id: 1,
    name: "김의천",
    githubUrl: "https://github.com/wzrabbit",
    memberActions: reviewerActions("FRONTEND", [4, 3, 2, 1]),
  },
  {
    id: 2,
    name: "송은우",
    githubUrl: "https://github.com/be-student",
    memberActions: reviewerActions("BACKEND", [2, 1]),
  },
  {
    id: 3,
    name: "백경환",
    githubUrl: "https://github.com/dooboocookie",
    memberActions: reviewerActions("BACKEND", [3, 2, 1]),
  },
  {
    id: 4,
    name: "조승현",
    githubUrl: "https://github.com/BackFoxx",
    memberActions: reviewerActions("BACKEND", [2, 1]),
  },
  {
    id: 5,
    name: "정다빈",
    githubUrl: "https://github.com/70825",
    memberActions: reviewerActions("BACKEND", [4, 3, 2, 1]),
  },
  {
    id: 6,
    name: "김민석",
    githubUrl: "https://github.com/shackstack",
    memberActions: reviewerActions("FRONTEND", [3]),
  },
  {
    id: 7,
    name: "신동훈",
    githubUrl: "https://github.com/shin-mallang",
    memberActions: reviewerActions("BACKEND", [2]),
  },
  {
    id: 8,
    name: "정수영",
    githubUrl: "https://github.com/suyoungj",
    memberActions: reviewerActions("FRONTEND", [3]),
  },
  {
    id: 9,
    name: "최혜령",
    githubUrl: "https://github.com/HyeryongChoi",
    memberActions: reviewerActions("FRONTEND", [3]),
  },
  {
    id: 10,
    name: "조상준",
    githubUrl: "https://github.com/sangjun121",
    memberActions: reviewerActions("BACKEND", [4]),
  },
];

/** 든든한 리뷰어(외부) 목록. API가 없어서 정적 데이터예요 */
export async function getExternalReviewers(): Promise<ExternalReviewer[]> {
  return EXTERNAL_REVIEWERS;
}

/** 든든한 리뷰어 상세. 없으면 undefined를 줘서 화면이 not-found로 넘겨요 */
export async function getExternalReviewer(id: string): Promise<ExternalReviewer | undefined> {
  return EXTERNAL_REVIEWERS.find((reviewer) => String(reviewer.id) === id);
}

// TODO(기수 중앙화): app/_sections/content.ts의 RECRUITING_COHORT 옆 TODO 참고
const COHORTS = [5, 4, 3, 2, 1];

/** 필터에 쓰는 기수 목록 */
export async function getMemberCohorts(): Promise<number[]> {
  return COHORTS;
}
