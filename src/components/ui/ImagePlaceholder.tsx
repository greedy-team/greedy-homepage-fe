import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const imagePlaceholderVariants = cva(
  "flex items-center justify-center rounded-md bg-gray-100 text-caption text-text-subtle",
  {
    variants: {
      /** 이미지 비율은 세 가지만 사용 */
      ratio: {
        "16/9": "aspect-video",
        "4/3": "aspect-4/3",
        "1/1": "aspect-square",
      },
    },
    defaultVariants: {
      ratio: "16/9",
    },
  },
);

type ImagePlaceholderProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof imagePlaceholderVariants> & {
    /** 자리에 표시할 이름 */
    label?: string;
  };

export function ImagePlaceholder({ className, ratio, label = "사진", ...props }: ImagePlaceholderProps) {
  return (
    <div className={cn(imagePlaceholderVariants({ ratio }), className)} {...props}>
      {label}
    </div>
  );
}
