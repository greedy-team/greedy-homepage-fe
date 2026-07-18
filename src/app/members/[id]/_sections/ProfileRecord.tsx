import Link from "next/link";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { cn, focusRing } from "@/shared/lib/cn";
import type { Member } from "@/entities/member/model";
import type { ProjectSummary } from "@/entities/project/model";
import { PROFILE } from "../../_sections/content";

/** 기수 이력 한 장 */
function HistoryCard({ cohort, title }: { cohort: string; title: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <Badge variant="brand">{cohort}</Badge>
      <span className="text-body text-text">{title}</span>
    </Card>
  );
}

/**
 * 오른쪽에 쌓이는 기록. 활동 이력 → 프로젝트 → 참여한 활동 순서예요.
 * 이력은 최근 두 기수만 펼치고 이전은 접어요. 해당 없는 칸은 숨기고,
 * 아직 없는 기록만 빈 상태로 남겨서 채워질 자리라는 걸 알려줘요.
 */
export function ProfileRecord({
  member,
  projects,
}: {
  member: Member;
  projects: ProjectSummary[];
}) {
  // 지금 기수에 활동 중이면 이번 기수 프로젝트가 아직 없다는 안내를 붙여요.
  // 든든한 리뷰어는 팀 프로젝트를 하지 않아서 칸 자체가 해당 없어요
  const activeNow = member.history[0]?.cohort === "4기" && member.role !== "든든한 리뷰어";
  const showProjects = projects.length > 0 || activeNow;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 text-text">{PROFILE.historyTitle}</h2>
        <ul className="flex flex-col gap-3">
          {member.history.map((record) => (
            <li key={`${record.cohort}-${record.title}`}>
              <HistoryCard cohort={record.cohort} title={record.title} />
            </li>
          ))}
        </ul>
      </section>

      {showProjects && (
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 text-text">{PROFILE.projectsTitle}</h2>
          {projects.length > 0 && (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className={cn("block rounded-lg", focusRing)}
                  >
                    <Card className="flex h-full flex-col gap-3 transition-colors hover:border-gray-300">
                      <ImagePlaceholder ratio="16/9" label="화면" />
                      <div className="flex flex-col gap-1">
                        <span className="text-body font-semibold text-text">{project.name}</span>
                        <span className="text-body-sm text-text-subtle">
                          {project.cohort} 팀 프로젝트
                        </span>
                      </div>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {activeNow && <p className="text-body-sm text-text-subtle">{PROFILE.projectsPending}</p>}
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-h3 text-text">{PROFILE.activitiesTitle}</h2>
        <p className="text-body-sm text-text-subtle">{PROFILE.activitiesEmpty}</p>
      </section>
    </div>
  );
}
