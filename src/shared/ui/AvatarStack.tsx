import { Avatar, avatarVariants } from "@/shared/ui/Avatar";
import { cn } from "@/shared/lib/cn";

type AvatarStackProps = {
  people: { name: string; src?: string }[];
  /** 이 수를 넘으면 +n으로 접어요 */
  max?: number;
  className?: string;
};

/** 함께한 사람들을 겹쳐서 보여줘요. 넘치는 인원은 +n으로 접어요 */
export function AvatarStack({ people, max = 4, className }: AvatarStackProps) {
  const visible = people.slice(0, max);
  const rest = people.length - visible.length;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {visible.map((p, index) => (
        // 동명이인이 있을 수 있어서 이름만으로는 key가 안 돼요
        <Avatar key={`${p.name}-${index}`} name={p.name} src={p.src} size="sm" className="ring-2 ring-bg" />
      ))}
      {rest > 0 && (
        <span className={cn(avatarVariants({ size: "sm", tone: "muted" }), "ring-2 ring-bg")}>+{rest}</span>
      )}
    </div>
  );
}
