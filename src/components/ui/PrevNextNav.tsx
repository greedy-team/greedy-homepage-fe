import { cn, focusRing } from "@/lib/cn";

type NavArrowButtonProps = {
  direction: "prev" | "next";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

/** 한 방향 화살표 버튼. 캐러셀 양옆처럼 따로 놓을 때 써요. 44px로 터치 최소치를 지켜요 */
export function NavArrowButton({ direction, onClick, disabled, className }: NavArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "이전" : "다음"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-text transition-colors hover:bg-surface disabled:pointer-events-none disabled:text-disabled",
        focusRing,
        className,
      )}
    >
      {direction === "prev" ? <>&larr;</> : <>&rarr;</>}
    </button>
  );
}

type PrevNextNavProps = {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

/** 이전 다음 화살표 쌍. 상세 화면 하단의 이전 다음 이동처럼 붙여 쓸 때 써요 */
export function PrevNextNav({ onPrev, onNext, prevDisabled, nextDisabled, className }: PrevNextNavProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <NavArrowButton direction="prev" onClick={onPrev} disabled={prevDisabled} />
      <NavArrowButton direction="next" onClick={onNext} disabled={nextDisabled} />
    </div>
  );
}
