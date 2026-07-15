import { Stat } from "@/shared/ui/Stat";
import { STATS } from "./content";

/** 숫자로 신뢰를 만드는 스탯 밴드. 좁은 화면에서는 2×2로 접혀요. */
export function StatBand() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-20">
        {STATS.map((stat) => (
          <Stat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
