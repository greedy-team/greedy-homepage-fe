import Link from "next/link";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ProjectMember } from "@/entities/project/model";

/**
 * 프로젝트를 함께 만든 사람들. 이름과 담당(FE/BE)을 보여줘요.
 * 프로필이 있는 사람은 이름을 눌러 이동하고, 외부 기여자는 없을 수 있어요.
 */
export function Contributors({ members }: { members: ProjectMember[] }) {
  if (members.length === 0) return null;
  const hasProfile = members.some((member) => member.profileHref);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">함께 만든 사람들</h2>
      {/* 모바일은 한 명씩 세로로, 데스크톱은 가로 한 줄로 넘치면 감겨요 */}
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
        {members.map((member, index) => {
          const body = (
            <>
              <Avatar name={member.name} size="sm" />
              <span className="text-body-sm text-text">{member.name}</span>
              <Badge variant="outline">{member.position}</Badge>
            </>
          );
          return (
            <li key={`${member.name}-${index}`}>
              {member.profileHref ? (
                <Link
                  href={member.profileHref}
                  className={cn("flex items-center gap-2 rounded-full", focusRing)}
                >
                  {body}
                </Link>
              ) : (
                <div className="flex items-center gap-2">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      {hasProfile && <p className="text-body-sm text-text-subtle">이름을 누르면 멤버 프로필로 이동해요.</p>}
    </section>
  );
}
