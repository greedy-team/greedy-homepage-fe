import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { formatAffiliation, formatMemberRole, getAvatarUrl, roleAt } from "@/entities/member/lib";
import type { Member } from "@/entities/member/model";
import { PROFILE } from "../../_sections/content";

/**
 * 상단 가로 헤더. 사진 · 이름 · 배지(소속 + 역할) · 자기소개(본인 작성, 없으면 숨김) · GitHub.
 * 배지는 지금(최신) 기수의 역할만 보여줘요. 지난 역할은 활동 이력 카드가 말해줘요.
 */
export function ProfileHeader({ member }: { member: Member }) {
  const affiliation = formatAffiliation(member);
  const role = roleAt(member, null);

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
      <Avatar name={member.name} src={getAvatarUrl(member)} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-h1 text-text">{member.name}</h1>
          <div className="flex flex-wrap gap-2">
            {affiliation && <Badge variant="brand">{affiliation}</Badge>}
            {role && <Badge variant="outline">{formatMemberRole(role)}</Badge>}
          </div>
        </div>
        {member.description && (
          <p className="whitespace-pre-line text-body text-gray-700">{member.description}</p>
        )}
      </div>
      {/* 좁은 화면은 꽉 찬 버튼으로 쌓이고, md부터 헤더 오른쪽 끝에 붙어요 */}
      {member.githubUrl && (
        <Button variant="ghost" size="sm" href={member.githubUrl} className="md:shrink-0">
          {PROFILE.github}
        </Button>
      )}
    </header>
  );
}
