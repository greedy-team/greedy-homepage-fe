import { cn } from "@/lib/cn";
import { TextLink } from "@/components/ui/TextLink";

type SectionHeaderProps = {
  title: string;
  /** 제목 아래 한 줄 설명 */
  subtitle?: string;
  /** 값을 주면 오른쪽에 더보기 링크 표시 */
  moreHref?: string;
  moreLabel?: string;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  moreHref,
  moreLabel = "더보기",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-h2 text-text">{title}</h2>
        {subtitle && <p className="text-body-sm text-text-subtle">{subtitle}</p>}
      </div>
      {moreHref && <TextLink href={moreHref}>{moreLabel}</TextLink>}
    </div>
  );
}
