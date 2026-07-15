import { VALUES } from "./content";

/** 그리디가 지키는 가치. 브랜드 그린 밴드에 네 가지 가치를 2×2로 보여줘요. */
export function ValueBand() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-20 md:py-20">
        <h2 className="text-h2">그리디가 지키는 것</h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {VALUES.map((value) => (
            <div key={value.title}>
              <dt className="text-h3">{value.title}</dt>
              <dd className="mt-1 text-body-sm text-white/80">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
