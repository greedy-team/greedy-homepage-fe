import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { TextLink } from "@/shared/ui/TextLink";
import type { Member } from "@/entities/member/model";
import { PROFILE } from "../../_sections/content";

/** 최신 이력에서 트랙 배지를 뽑아요. 겸직이 아니면 그 기수의 트랙 하나만 보여요 */
function latestTrack(member: Member): string | undefined {
  const title = member.history[0]?.title ?? "";
  if (title.includes("프론트엔드")) return "FE";
  if (title.includes("백엔드")) return "BE";
  return undefined;
}

/**
 * 왼쪽 고정 정보. 사진 · 이름 · 자기소개(본인 작성, 없으면 숨김) · 배지 · GitHub.
 * 배지는 지금(최신) 기수의 역할만 보여줘요. 지난 역할은 활동 이력 카드가 말해줘요.
 */
export function ProfileSidebar({ member }: { member: Member }) {
  const cohort = member.history[0]?.cohort;
  const track = latestTrack(member);

  return (
    <aside className="flex flex-col items-start gap-4 md:w-64 md:shrink-0">
      <Avatar name={member.name} src={member.photoUrl} size="lg" />
      <div className="flex flex-col gap-2">
        <h1 className="text-h1 text-text">{member.name}</h1>
        {member.intro && <p className="text-body text-gray-700">{member.intro}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        {cohort && <Badge variant="brand">{cohort}</Badge>}
        {track && <Badge variant="outline">{track}</Badge>}
        <Badge variant="outline">{member.role}</Badge>
      </div>
      {member.githubUrl && (
        <TextLink variant="action" href={member.githubUrl}>
          {PROFILE.github}
        </TextLink>
      )}
    </aside>
  );
}
