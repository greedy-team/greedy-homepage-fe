import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  /** 채우러 가는 행동이 있다면 버튼이나 링크를 넣어요 */
  children?: React.ReactNode;
  className?: string;
};

/** 아직 데이터가 없는 자리. 비어 있는 이유와 다음 행동을 알려줘요 */
export function EmptyState({ title, description, children, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center",
        className,
      )}
    >
      <p className="text-body font-semibold text-text">{title}</p>
      {description && <p className="text-body-sm text-text-subtle">{description}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
