import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { getProject, getProjects } from "@/entities/project/api";
import { AdjacentNav } from "./_sections/AdjacentNav";
import { Contributors } from "./_sections/Contributors";
import { DetailHeader } from "./_sections/DetailHeader";
import { ProjectIntro } from "./_sections/ProjectIntro";
import { ProjectLinks } from "./_sections/ProjectLinks";
import { ScreenGallery } from "./_sections/ScreenGallery";

type Params = { id: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [project, projects] = await Promise.all([getProject(id), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.id === id);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:px-20 md:py-20">
      <DetailHeader project={project} />
      {/* 이미지와 (모바일) 버튼은 한 묶음이라 가깝게 둬요. 다음 구획과는 더 벌어져요 */}
      <div className="flex flex-col gap-6">
        {/* 대표 이미지 주소가 확정되면 썸네일을 넣어요. 지금은 자리표시자를 보여줘요 */}
        <ImagePlaceholder ratio="16/9" label="대표 화면" />
        {/* 모바일에서는 링크 버튼을 이미지 아래 전체폭으로 쌓아요. 데스크톱은 헤더에 있어요 */}
        <div className="md:hidden">
          <ProjectLinks project={project} fullWidth />
        </div>
      </div>
      <ProjectIntro project={project} />
      <ScreenGallery images={project.imageUrls} />
      <Contributors members={project.members} />
      <AdjacentNav prev={prev} next={next} />
    </div>
  );
}
