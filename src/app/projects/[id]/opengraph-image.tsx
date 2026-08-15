import { getProject } from "@/entities/project/api";
import { SITE_NAME } from "@/shared/config/site";
import { ogImage } from "../../_og/image";
import { OG_SIZE } from "../../_og/OgCard";

export const alt = "팀 프로젝트 - 그리디";
export const size = OG_SIZE;
export const contentType = "image/png";

/** 프로젝트형 카드: 라벨 · 프로젝트명 · 한 줄 소개 */
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return ogImage({ title: SITE_NAME });

  return ogImage({ label: "팀 프로젝트", title: project.name, sub: project.summary });
}
