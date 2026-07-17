import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { TimelineItem } from "@/shared/ui/TimelineItem";
import { PAGE, type CurriculumPhase } from "./content";

/** 주차별 커리큘럼. 페이즈마다 어떤 미션으로 무엇을 익히는지 붙여요 */
export function Curriculum({ phases }: { phases: CurriculumPhase[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-h2 text-text">주차별 커리큘럼</h2>
      <div className="mt-6">
        {phases.map((phase, index) => (
          <TimelineItem key={phase.weeks} date={phase.weeks} last={index === phases.length - 1}>
            <Card className="flex flex-col gap-2">
              <h3 className="text-h3 text-text">{phase.title}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="brand">미션</Badge>
                <p className="text-body-sm text-text">{phase.mission}</p>
              </div>
              <p className="text-body-sm text-text-subtle">{phase.description}</p>
            </Card>
          </TimelineItem>
        ))}
      </div>
      <p className="mt-6 text-caption text-text-subtle">{PAGE.note}</p>
    </section>
  );
}
