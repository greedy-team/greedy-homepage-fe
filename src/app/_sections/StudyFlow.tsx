import { Card } from "@/shared/ui/Card";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { STUDY_FLOW } from "./content";

/** 그리디의 한 학기 흐름. 스터디에서 데모데이까지 4단계를 순서대로 보여줘요. */
export function StudyFlow() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-20 md:py-20">
      <SectionHeader title="그리디의 한 학기" subtitle="스터디에서 데모데이까지, 이렇게 성장해요" />
      <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {STUDY_FLOW.map((step, index) => (
          <li key={step.title}>
            <Card className="flex h-full flex-col gap-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-soft text-caption font-semibold text-green-700">
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-h3 text-text">{step.title}</h3>
                <p className="text-body-sm text-text-subtle">{step.description}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
