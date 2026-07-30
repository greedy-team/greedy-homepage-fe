import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { TextLink } from "@/shared/ui/TextLink";
import { getExternalReviewer, getExternalReviewers } from "@/entities/member/api";
import { formatAffiliation, formatMemberRole, getAvatarUrl } from "@/entities/member/lib";
import { PROFILE } from "../../_sections/content";

type Params = { id: string };

export async function generateStaticParams() {
  const reviewers = await getExternalReviewers();
  return reviewers.map((reviewer) => ({ id: String(reviewer.id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const reviewer = await getExternalReviewer(id);
  if (!reviewer) return {};
  return { title: reviewer.name, description: `${reviewer.name} · 든든한 리뷰어` };
}

/**
 * 든든한 리뷰어(외부) 프로필. memberActions 모양이 내부 멤버와 같아서
 * formatAffiliation/roleAt을 그대로 재사용해요(역할은 항상 REVIEWER예요).
 * 백엔드에 이 사람들의 자기소개·프로젝트 이력을 저장할 곳이 없어서
 * 헤더 + 리뷰 참여 기수 정도만 보여줘요(entities/member/model.ts의 ExternalReviewer TODO 참고).
 */
export default async function ExternalReviewerProfilePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const reviewer = await getExternalReviewer(id);
  if (!reviewer) notFound();

  const affiliation = formatAffiliation(reviewer);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-20 md:py-20">
      <TextLink variant="back" href="/members">
        {PROFILE.back}
      </TextLink>

      <header className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <Avatar name={reviewer.name} src={getAvatarUrl(reviewer)} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="text-h1 text-text">{reviewer.name}</h1>
            <div className="flex flex-wrap gap-2">
              {affiliation && <Badge variant="brand">{affiliation}</Badge>}
              <Badge variant="outline">든든한 리뷰어</Badge>
            </div>
          </div>
        </div>
        {reviewer.githubUrl && (
          <Button variant="ghost" size="sm" href={reviewer.githubUrl} className="md:shrink-0">
            {PROFILE.github}
          </Button>
        )}
      </header>

      {reviewer.memberActions.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 text-text">{PROFILE.historyTitle}</h2>
          <ul className="flex flex-col gap-3">
            {reviewer.memberActions.map((action, index) => (
              <li key={`${action.generationNumber}-${index}`}>
                <Card className="flex items-center gap-3 p-4">
                  <Badge variant="brand">{action.generationNumber}기</Badge>
                  <span className="text-body text-text">{formatMemberRole(action.memberRole)}</span>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
