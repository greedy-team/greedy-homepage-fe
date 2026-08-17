import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { cn, focusRing } from "@/shared/lib/cn";
import { formatMemberRole, groupHistoryByGeneration } from "@/entities/member/lib";
import type { Member, ResolvedMemberRole } from "@/entities/member/model";
import type { ProjectSummary } from "@/entities/project/model";
import { PROFILE } from "../../_sections/content";

/** 기수 이력 한 장. 한 기수에 겸한 역할은 가운뎃점으로 이어 붙여요. 창립은 기수 대신 "창립" */
function HistoryCard({
  generationNumber,
  roles,
}: {
  generationNumber: number | null;
  roles: ResolvedMemberRole[];
}) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <Badge variant="brand">{generationNumber !== null ? `${generationNumber}기` : "창립"}</Badge>
      <span className="text-body text-text">{roles.map(formatMemberRole).join(" · ")}</span>
    </Card>
  );
}

/**
 * 헤더 아래 쌓이는 기록. 활동 이력 → 프로젝트 순서예요.
 * 칸은 데이터가 주는 대로 그려요 — 기록이 있으면 목록, 없으면 칸을 숨겨요.
 * 왜 비었는지는 화면이 추측하지 않아요. 서버 명세에 그 정보가 생기면 그때 보여줘요.
 */
export function ProfileRecord({
  member,
  projects,
}: {
  member: Member;
  projects: ProjectSummary[];
}) {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 text-text">{PROFILE.historyTitle}</h2>
        <ul className="flex flex-col gap-3">
          {groupHistoryByGeneration(member).map((history) => (
            <li key={history.generationNumber ?? "founding"}>
              <HistoryCard generationNumber={history.generationNumber} roles={history.roles} />
            </li>
          ))}
        </ul>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 text-text">{PROFILE.projectsTitle}</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className={cn("block rounded-lg", focusRing)}
                >
                  <Card className="flex h-full flex-col gap-3 transition-colors hover:border-gray-300">
                    {project.thumbnailUrl ? (
                      <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                        <Image
                          src={project.thumbnailUrl}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder ratio="16/9" label="화면" />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-body font-semibold text-text">{project.name}</span>
                      <span className="text-body-sm text-text-subtle">
                        {project.generationNumber}기 팀 프로젝트
                      </span>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
