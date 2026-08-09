import { getMember } from "@/entities/member/api";
import { SITE_NAME } from "@/shared/config/site";
import { ogImage } from "../../_og/image";
import { OG_SIZE } from "../../_og/OgCard";

export const alt = "멤버 - 그리디";
export const size = OG_SIZE;
export const contentType = "image/png";

/** 멤버형 카드: 라벨 · 이름 · 역할, 오른쪽에 깃허브 프로필 사진 */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember(decodeURIComponent(id));
  if (!member) return ogImage({ title: SITE_NAME });

  const cohort = member.history[0]?.cohort;
  const sub = [cohort ? `${cohort} ${member.role}` : member.role, member.tracks.join("/")]
    .filter(Boolean)
    .join(" · ");
  return ogImage({ label: "멤버", title: member.name, sub, imageSrc: member.photoUrl });
}
