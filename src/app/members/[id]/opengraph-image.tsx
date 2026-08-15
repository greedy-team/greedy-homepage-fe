import { getMember } from "@/entities/member/api";
import { formatAffiliation, formatMemberBadge, getAvatarUrl, roleAt } from "@/entities/member/lib";
import { SITE_NAME } from "@/shared/config/site";
import { ogImage } from "../../_og/image";
import { OG_SIZE } from "../../_og/OgCard";

export const alt = "멤버 - 그리디";
export const size = OG_SIZE;
export const contentType = "image/png";

/** 멤버형 카드: 라벨 · 이름 · 소속과 역할, 오른쪽에 깃허브 프로필 사진 */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) return ogImage({ title: SITE_NAME });

  // 프로필 헤더의 배지와 같은 값이에요 (소속 · 역할)
  const role = roleAt(member, null);
  const sub = [formatAffiliation(member), role && formatMemberBadge(member, role)]
    .filter(Boolean)
    .join(" · ");
  return ogImage({ label: "멤버", title: member.name, sub, imageSrc: getAvatarUrl(member) });
}
