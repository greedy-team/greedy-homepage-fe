import Link from "next/link";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ProjectSummary } from "@/entities/project/model";

function AdjacentCard({ project, direction }: { project: ProjectSummary; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "flex flex-col gap-1 rounded-lg bg-surface p-6 transition-colors hover:bg-gray-100",
        isPrev ? "items-start" : "items-end",
        focusRing,
      )}
    >
      <span className="text-caption text-text-subtle">
        {isPrev ? "← 이전 프로젝트" : "다음 프로젝트 →"}
      </span>
      <span className="text-body text-text">{project.name}</span>
    </Link>
  );
}

/** 인접 프로젝트로 넘어가는 이전·다음. 한쪽 끝이면 있는 쪽만 보여줘요 */
export function AdjacentNav({ prev, next }: { prev?: ProjectSummary; next?: ProjectSummary }) {
  if (!prev && !next) return null;

  return (
    // 모바일 시안에는 이전·다음이 없어요. 데스크톱에서만 보여줘요
    <nav className="hidden gap-4 md:grid md:grid-cols-2">
      {prev ? <AdjacentCard project={prev} direction="prev" /> : <span aria-hidden />}
      {next ? <AdjacentCard project={next} direction="next" /> : <span aria-hidden />}
    </nav>
  );
}
