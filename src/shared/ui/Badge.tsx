import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
  // 배지는 두 단어 이하의 정보라 어디서든 한 줄이에요. 좁은 flex에서 쥐어짜여 꺾이지 않게 해요
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full px-3 py-1 text-caption font-semibold",
  {
    variants: {
      variant: {
        /** 모집 중처럼 진행 중인 상태. 한 화면에 하나만 */
        solid: "bg-brand text-white",
        /** 기수처럼 우리 것임을 보여주는 정보 */
        brand: "bg-brand-soft text-green-700",
        /** 트랙, 분류 같은 구분 정보 */
        outline: "border border-border bg-bg text-gray-700",
        /** 글 주제 태그처럼 여러 개 붙는 것 */
        neutral: "bg-gray-100 text-gray-700",
        /** 마감처럼 끝난 상태 */
        muted: "bg-gray-100 text-text-subtle",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
