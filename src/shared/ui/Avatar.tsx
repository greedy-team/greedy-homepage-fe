import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

export const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
  {
    variants: {
      size: {
        sm: "size-8 text-caption",
        md: "size-10 text-body-sm",
        lg: "size-16 text-h3",
      },
      /** member는 이니셜 폴백 배경, muted는 아바타 스택의 +n 같은 보조 원 */
      tone: {
        member: "bg-green-100 text-green-700",
        muted: "bg-gray-100 text-text-subtle",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "member",
    },
  },
);

const SIZE_PX = { sm: 32, md: 40, lg: 64 } as const;

type AvatarProps = VariantProps<typeof avatarVariants> & {
  /** 프로필 사진 주소. 없으면 이름 첫 글자를 보여줘요 */
  src?: string;
  name: string;
  className?: string;
};

export function Avatar({ src, name, size, tone, className }: AvatarProps) {
  const px = SIZE_PX[size ?? "md"];
  return (
    <span className={cn(avatarVariants({ size, tone }), className)}>
      {src ? (
        <Image src={src} alt={name} width={px} height={px} className="size-full object-cover" />
      ) : (
        name.charAt(0)
      )}
    </span>
  );
}
