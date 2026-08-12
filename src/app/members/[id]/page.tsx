import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextLink } from "@/shared/ui/TextLink";
import { getMember, getMembers } from "@/entities/member/api";
import { formatAffiliation } from "@/entities/member/lib";
import type { Member } from "@/entities/member/model";
import { getProject } from "@/entities/project/api";
import type { ProjectSummary } from "@/entities/project/model";
import { PROFILE } from "../_sections/content";
import { ProfileHeader } from "./_sections/ProfileHeader";
import { ProfileRecord } from "./_sections/ProfileRecord";

type Params = { id: string };

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ id: String(member.id) }));
}

// TODO(기수 중앙화): app/_sections/content.ts의 RECRUITING_COHORT 옆 TODO 참고
const CURRENT_GENERATION = 4;

/** teamProjects의 projectId로 실제 프로젝트를 가져와요. 완료된(진행 중 아닌) 기수만 보여줘요 */
async function getMemberProjects(teamProjects: Member["teamProjects"]): Promise<ProjectSummary[]> {
  const projects = await Promise.all(
    teamProjects.map((teamProject) => getProject(String(teamProject.projectId))),
  );
  return projects
    .filter((project) => project !== undefined)
    .filter((project) => project.generationNumber !== CURRENT_GENERATION)
    .map(({ id, name, generationNumber, summary, thumbnailUrl }) => ({
      id,
      name,
      generationNumber,
      summary,
      thumbnailUrl,
    }));
}

/** 소속 문구를 못 만들면(memberActions가 비어있으면) 이름으로 대체해요 */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) return {};
  return { title: member.name, description: formatAffiliation(member) ?? member.name };
}

/** 위는 명함(변하지 않는 정보), 아래는 쌓이는 기록이에요 */
export default async function MemberProfilePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  const projects = await getMemberProjects(member.teamProjects);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-20 md:py-20">
      <TextLink variant="back" href="/members">
        {PROFILE.back}
      </TextLink>
      <ProfileHeader member={member} />
      <ProfileRecord member={member} projects={projects} />
    </div>
  );
}
