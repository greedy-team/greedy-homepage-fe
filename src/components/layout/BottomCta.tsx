import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type BottomCtaProps = {
  href: string;
  label: string;
  /** 버튼 아래 작은 안내 한 줄 */
  caption?: string;
  className?: string;
};

/**
 * 화면 하단에 고정되는 버튼. 모집 중에, 랜딩에서만 써요.
 * 좁은 화면 전용이라 쓰는 곳에서 md:hidden을 함께 줘요. 노출 시점(히어로를 지나면 표시)도 쓰는 화면에서 정해요.
 */
export function BottomCta({ href, label, caption, className }: BottomCtaProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-1 border-t border-border bg-bg px-5 pt-3 pb-4",
        className,
      )}
    >
      <Button size="lg" href={href} className="w-full">
        {label}
      </Button>
      {caption && <p className="text-caption text-text-subtle">{caption}</p>}
    </div>
  );
}
