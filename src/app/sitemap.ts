import type { MetadataRoute } from "next";
import { getActivities } from "@/entities/activity/api";
import { getMembers } from "@/entities/member/api";
import { getProjects } from "@/entities/project/api";
import { SITE_URL } from "@/shared/config/site";

/** 검색엔진에 알리는 전체 주소 목록. 페이지와 상세를 모두 담아요 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activities, members, projects] = await Promise.all([
    getActivities(),
    getMembers(),
    getProjects(),
  ]);

  const pages = ["", "/activities", "/members", "/study", "/projects"].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  return [
    ...pages,
    ...activities.map((activity) => ({ url: `${SITE_URL}/activities/${activity.id}` })),
    ...members.map((member) => ({ url: `${SITE_URL}/members/${member.id}` })),
    ...projects.map((project) => ({ url: `${SITE_URL}/projects/${project.id}` })),
  ];
}
