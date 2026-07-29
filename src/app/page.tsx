import { ActivityPreview } from "./_sections/ActivityPreview";
import { BottomCtaReveal } from "./_sections/BottomCtaReveal";
import { RECRUITING_COHORT } from "./_sections/content";
import { Hero } from "./_sections/Hero";
import { ProjectShowcase } from "./_sections/ProjectShowcase";
import { StatBand } from "./_sections/StatBand";
import { StudyFlow } from "./_sections/StudyFlow";
import { ValueBand } from "./_sections/ValueBand";
import { getActivities } from "@/entities/activity/api";
import { getFeaturedProjects } from "@/entities/project/api";
import { APPLY_FORM_URL, IS_RECRUITING } from "@/shared/config/site";

// activities는 실제 API(fetch, ISR)로 바뀌었고, projects는 아직 정적 큐레이션이에요.
// project도 API로 옮기면 이 페이지 전체가 fetch 기반이 돼요. 배경은 docs/adr/002 참고.
export default async function Home() {
  const [activities, projects] = await Promise.all([
    getActivities(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <Hero />
      {/* 모집 중에만, 좁은 화면에서만 뜨는 하단 고정 CTA. 히어로를 지나면 나타나요 */}
      {IS_RECRUITING && (
        <BottomCtaReveal
          href={APPLY_FORM_URL || "#"}
          label={`${RECRUITING_COHORT} 지원하기`}
          caption="모집 마감 전에 지원해 주세요."
        />
      )}
      <StatBand />
      <StudyFlow />
      <ActivityPreview activities={activities} />
      <ProjectShowcase projects={projects} />
      <ValueBand />
    </>
  );
}
