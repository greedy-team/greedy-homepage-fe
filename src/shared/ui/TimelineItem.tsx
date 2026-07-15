import { cn } from "@/shared/lib/cn";

type TimelineItemProps = {
  /** 왼쪽에 붙는 날짜나 주차 라벨 */
  date?: string;
  /** 마지막 항목이면 연결선을 그리지 않아요 */
  last?: boolean;
  children: React.ReactNode;
  className?: string;
};

/** 세로 타임라인의 한 칸. 도트와 선이 시간의 흐름을 보여줘요 */
export function TimelineItem({ date, last, children, className }: TimelineItemProps) {
  return (
    <div className={cn("flex gap-5", className)}>
      {date && (
        <p className="w-20 shrink-0 pt-1 text-right text-body-sm font-semibold text-text-subtle">{date}</p>
      )}
      <div className="flex flex-col items-center">
        <span className="mt-1 size-3 shrink-0 rounded-full bg-brand" />
        {!last && <span className="w-0.5 grow bg-border" />}
      </div>
      <div className={cn("min-w-0 grow", !last && "pb-8")}>{children}</div>
    </div>
  );
}
