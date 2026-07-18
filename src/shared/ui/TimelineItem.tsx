import { cn } from "@/shared/lib/cn";

type TimelineItemProps = {
  /** 날짜나 주차 라벨 */
  date?: string;
  /** 마지막 항목이면 연결선을 그리지 않아요 */
  last?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * 세로 타임라인의 한 칸. 도트와 선이 시간의 흐름을 보여줘요.
 * 좁은 화면에서는 도트와 라벨이 콘텐츠 위에 한 줄로 오고 연결선은 없어요.
 * md부터는 라벨이 왼쪽 컬럼에 붙고 도트·선이 세로 축을 그려요.
 */
export function TimelineItem({ date, last, children, className }: TimelineItemProps) {
  return (
    <div className={cn("flex flex-col gap-2 md:flex-row md:gap-5", className)}>
      {date && (
        <>
          <p className="flex items-center gap-2 text-body-sm font-semibold text-text-subtle md:hidden">
            <span className="size-2 rounded-full bg-brand" />
            {date}
          </p>
          <p className="hidden w-20 shrink-0 pt-1 text-right text-body-sm font-semibold text-text-subtle md:block">
            {date}
          </p>
        </>
      )}
      <div className="hidden flex-col items-center md:flex">
        <span className="mt-1 size-3 shrink-0 rounded-full bg-brand" />
        {!last && <span className="w-0.5 grow bg-border" />}
      </div>
      <div className={cn("min-w-0 grow", !last && "pb-6 md:pb-8")}>{children}</div>
    </div>
  );
}
