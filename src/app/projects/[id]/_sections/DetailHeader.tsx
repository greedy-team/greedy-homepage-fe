import { Badge } from "@/shared/ui/Badge";
import { TextLink } from "@/shared/ui/TextLink";
import type { Project } from "@/entities/project/model";
import { ProjectLinks } from "./ProjectLinks";

/**
 * 상세 헤더. 뒤로가기 · 기수 · 이름을 담아요.
 * 링크 버튼은 데스크톱에서만 제목 옆에 두고, 모바일에서는 이미지 아래로 내려가요(page에서 렌더).
 */
export function DetailHeader({ project }: { project: Project }) {
  return (
    <header className="flex flex-col gap-4">
      <TextLink variant="back" href="/projects">
        프로젝트로
      </TextLink>
      <Badge variant="brand">{project.cohort}</Badge>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h1 className="text-display text-text">{project.name}</h1>
        <div className="hidden md:block">
          <ProjectLinks project={project} />
        </div>
      </div>
    </header>
  );
}
