import Link from "next/link";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { cn, focusRing } from "@/shared/lib/cn";
import { formatStackPosition } from "@/entities/project/lib";
import type { ProjectMember } from "@/entities/project/model";

/** 프로젝트를 함께 만든 사람들. 이름과 담당(FE/BE/디자인)을 보여줘요. 이름을 누르면 멤버 프로필로 이동해요 */
export function Contributors({ members }: { members: ProjectMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">함께 만든 사람들</h2>
      {/* 모바일은 한 명씩 세로로, 데스크톱은 가로 한 줄로 넘치면 감겨요 */}
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
        {members.map((member) => (
          <li key={member.memberId}>
            <Link
              href={`/members/${member.memberId}`}
              className={cn("flex items-center gap-2 rounded-full", focusRing)}
            >
              <Avatar name={member.name} size="sm" />
              <span className="text-body-sm text-text">{member.name}</span>
              <Badge variant="outline">{formatStackPosition(member.stackPosition)}</Badge>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-body-sm text-text-subtle">이름을 누르면 멤버 프로필로 이동해요.</p>
    </section>
  );
}
