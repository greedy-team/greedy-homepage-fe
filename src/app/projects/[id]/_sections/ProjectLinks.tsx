import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import type { Project } from "@/entities/project/model";

/**
 * 서비스와 프론트·백엔드 저장소 링크. 있는 것만 버튼으로 보여줘요.
 * 데스크톱은 헤더에서 가로로, 모바일은 이미지 아래에서 전체폭으로 쌓아 써요(fullWidth).
 */
export function ProjectLinks({
  project,
  fullWidth,
  className,
}: {
  project: Project;
  fullWidth?: boolean;
  className?: string;
}) {
  const buttonClass = fullWidth ? "w-full" : undefined;

  return (
    <div className={cn("flex gap-2", fullWidth ? "flex-col" : "flex-wrap", className)}>
      {project.siteUrl && (
        <Button href={project.siteUrl} className={buttonClass}>
          서비스 보러 가기
        </Button>
      )}
      {project.frontendGithubUrl && (
        <Button variant="ghost" href={project.frontendGithubUrl} className={buttonClass}>
          프론트 GitHub
        </Button>
      )}
      {project.backendGithubUrl && (
        <Button variant="ghost" href={project.backendGithubUrl} className={buttonClass}>
          백엔드 GitHub
        </Button>
      )}
    </div>
  );
}
