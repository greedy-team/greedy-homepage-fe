import { cn } from "@/shared/lib/cn";

type StatProps = {
  /** 어림 표기 없이 확인된 값만 써요 */
  value: string;
  label: string;
  className?: string;
};

/** 숫자로 신뢰를 만드는 통계 한 칸. 스탯 밴드에서 여러 개를 나란히 써요 */
export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <p className="text-h2 font-bold text-brand">{value}</p>
      <p className="text-caption text-text-subtle">{label}</p>
    </div>
  );
}
