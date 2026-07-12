import { cn, focusRing } from "@/lib/cn";

type FilterChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 선택되면 초록 배경으로 바뀌어요 */
  selected?: boolean;
};

/** 목록 바로 위에서 항목을 거르는 칩. 탭과 달리 여러 개를 나란히 둘 수 있어요 */
export function FilterChip({ selected, className, ...props }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        // after 가상 요소로 눌리는 영역을 위아래로 넓혀서 44px 터치 최소치를 채워요 (겉모습은 그대로)
        "relative rounded-full border px-3 py-1 text-caption font-semibold transition-colors after:absolute after:inset-x-0 after:-inset-y-2",
        selected
          ? "border-brand bg-brand text-white"
          : "border-border bg-bg text-gray-700 hover:border-gray-300",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}
