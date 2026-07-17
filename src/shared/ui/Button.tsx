import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, focusRing } from "@/shared/lib/cn";

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:bg-disabled disabled:text-white",
    // 겉모습이 44px보다 작아도 눌리는 영역은 44px를 지켜요. 이미 큰 lg는 영역이 안쪽에 들어가 그대로예요
    "after:absolute after:inset-x-0 after:top-1/2 after:h-11 after:-translate-y-1/2",
    focusRing,
  ),
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-green-700",
        ghost: "border border-brand bg-bg text-brand hover:bg-brand-soft",
        white: "bg-white text-brand hover:bg-green-50",
        "outline-white": "border border-white text-white hover:bg-white/10",
      },
      size: {
        sm: "h-8 px-4 text-body-sm",
        md: "h-10 px-4 text-body-sm",
        lg: "h-12 px-6 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** 값을 주면 버튼 모양의 링크(a)로 렌더링. 화면 이동은 링크, 상태 변경은 버튼 */
    href?: string;
  };

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
