import { WEEK_RHYTHM } from "./content";

/** 한 주가 굴러가는 리듬 4단계. 좁은 화면에서는 번호와 제목만 한 줄로 보여줘요 */
export function WeekRhythm() {
  return (
    <section className="mt-16">
      <h2 className="text-h2 text-text">한 주의 리듬</h2>
      <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {WEEK_RHYTHM.map((step, index) => (
          <li
            key={step.title}
            className="flex items-center gap-3 rounded-lg bg-surface p-4 md:flex-col md:items-start md:p-5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-body-sm font-semibold text-green-700">
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-h3 text-text">{step.title}</h3>
              <p className="hidden text-body-sm text-text-subtle md:block">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
