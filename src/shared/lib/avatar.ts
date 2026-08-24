/**
 * 깃허브 주소에서 프로필 사진 주소를 만들어요. github.com/{유저명}.png는 아바타로 리다이렉트돼요.
 * "프로필 사진은 깃허브 아바타를 쓴다"는 결정은 멤버 도메인(ADR 009·012)의 것이고,
 * 여기 있는 건 주소를 만드는 방법뿐이에요. 멤버·프로젝트 팀원이 함께 써요.
 */
export function getAvatarUrl(person: { githubUrl?: string }): string | undefined {
  if (!person.githubUrl) return undefined;
  const username = person.githubUrl.replace(/\/$/, "").split("/").pop();
  return username ? `https://github.com/${username}.png` : undefined;
}
