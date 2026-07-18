import type { Metadata } from "next";
import { getMemberCohorts, getMembers } from "@/entities/member/api";
import { MemberList } from "./_sections/MemberList";
import { PAGE } from "./_sections/content";

export const metadata: Metadata = {
  title: PAGE.title,
  description: PAGE.subtitle,
};

export default async function MembersPage() {
  const [members, cohorts] = await Promise.all([getMembers(), getMemberCohorts()]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-20 md:py-20">
      <header className="mb-10 flex flex-col gap-2">
        <h1 className="text-display text-text">{PAGE.title}</h1>
        <p className="text-body text-text-subtle">{PAGE.subtitle}</p>
      </header>
      <MemberList members={members} cohorts={cohorts} />
    </div>
  );
}
