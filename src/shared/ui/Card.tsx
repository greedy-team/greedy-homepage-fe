import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const cardVariants = cva("rounded-lg p-6", {
  variants: {
    variant: {
      /** 목록과 그리드의 기본 카드 */
      default: "border border-border bg-bg",
      /** 옅은 브랜드색으로 강조하는 카드 */
      highlight: "bg-brand-soft",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
