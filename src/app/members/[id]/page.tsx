import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextLink } from "@/shared/ui/TextLink";
import { getMember, getMembers } from "@/entities/member/api";
import { getProject, getProjects } from "@/entities/project/api";
import type { ProjectSummary } from "@/entities/project/model";
import { PROFILE } from "../_sections/content";
import { ProfileHeader } from "./_sections/ProfileHeader";
import { ProfileRecord } from "./_sections/ProfileRecord";

type Params = { id: string };

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ id: member.id }));
}

/** 이 멤버가 함께 만든, 완료된 기수의 프로젝트만 골라요 */
async function getMemberProjects(name: string): Promise<ProjectSummary[]> {
  const summaries = await getProjects();
  const projects = await Promise.all(summaries.map((summary) => getProject(summary.id)));
  return projects
    .filter((project) => project !== undefined)
    .filter(
      (project) =>
        project.cohort !== "4기" && project.members.some((member) => member.name === name),
    )
    .map(({ id, name: projectName, cohort, summary, thumbnailUrl }) => ({
      id,
      name: projectName,
      cohort,
      summary,
      thumbnailUrl,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const member = await getMember(decodeURIComponent(id));
  if (!member) return {};
  return { title: member.name, description: `${member.name} · ${member.affiliation}` };
}

export default async function MemberProfilePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const member = await getMember(decodeURIComponent(id));
  if (!member) notFound();

  const projects = await getMemberProjects(member.name);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-20 md:py-20">
      <TextLink variant="back" href="/members">
        {PROFILE.back}
      </TextLink>
      {/* 위는 명함(변하지 않는 정보), 아래는 쌓이는 기록 */}
      <ProfileHeader member={member} />
      <ProfileRecord member={member} projects={projects} />
    </div>
  );
}
