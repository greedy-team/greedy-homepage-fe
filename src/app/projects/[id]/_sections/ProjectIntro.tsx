import { Badge } from "@/shared/ui/Badge";
import type { Project } from "@/entities/project/model";

/** 프론트/백엔드 한 줄. 라벨과 배지를 나란히 두고, 좁은 화면에서는 라벨을 위로 올려요 */
function StackRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <span className="shrink-0 text-body-sm text-text-subtle sm:w-20 sm:pt-1">{label}</span>
      <ul className="flex flex-wrap gap-2">
        {items.map((stack) => (
          <li key={stack}>
            <Badge variant="outline">{stack}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 대표 이미지 아래에 오는 소개. 한 줄 요약을 먼저 읽고, 문제와 기능으로 이어져요.
 * 글은 읽기 좋게 폭을 좁히고, 기술 스택 배지는 전체 폭을 써서 프론트/백엔드로 나눠 보여줘요.
 */
export function ProjectIntro({ project }: { project: Project }) {
  const hasStack = project.frontendStack.length > 0 || project.backendStack.length > 0;

  return (
    <section className="flex flex-col gap-8">
      <p className="max-w-2xl text-body text-gray-700">{project.summary}</p>

      <div className="flex max-w-2xl flex-col gap-2">
        <h2 className="text-h3 text-text">어떤 문제를 풀었나요</h2>
        <p className="text-body text-gray-700">{project.purpose}</p>
      </div>

      <div className="flex max-w-2xl flex-col gap-2">
        <h2 className="text-h3 text-text">주요 기능</h2>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-body text-gray-700 marker:text-text-subtle">
          {project.mainFunction.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {hasStack && (
        <div className="flex flex-col gap-3">
          <h2 className="text-h3 text-text">기술 스택</h2>
          <StackRow label="프론트엔드" items={project.frontendStack} />
          <StackRow label="백엔드" items={project.backendStack} />
        </div>
      )}
    </section>
  );
}
