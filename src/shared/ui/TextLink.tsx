import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, focusRing } from "@/shared/lib/cn";

const textLinkVariants = cva(cn("text-body-sm transition-colors", focusRing), {
  variants: {
    variant: {
      /** 눌러볼 만한 다음 화면을 알리는 링크. 브랜드색 */
      action: "font-semibold text-brand hover:underline",
      /** 왔던 화면으로 돌아가는 링크. 화살표가 방향을 알려요 */
      back: "text-text-subtle hover:text-text",
      /** 꼭 필요하지만 안 눌러도 되는 링크. 무채색 */
      quiet: "text-text-subtle hover:underline",
    },
  },
  defaultVariants: {
    variant: "action",
  },
});

type TextLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof textLinkVariants>;

export function TextLink({ className, variant, children, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkVariants({ variant }), className)} {...props}>
      {variant === "back" ? <>&larr; {children}</> : children}
    </Link>
  );
}
