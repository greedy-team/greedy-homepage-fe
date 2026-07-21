import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { Carousel } from "@/shared/ui/Carousel";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ProjectSummary } from "@/entities/project/model";

type ProjectShowcaseProps = {
  projects: ProjectSummary[];
};

/** 대표 프로젝트 캐러셀. 좁은 화면에서는 스와이프로 넘겨요. */
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-20 md:py-20">
      <SectionHeader title="프로젝트" moreHref="/projects" />
      {/* 브레이크포인트마다 한 화면에 딱 떨어지게: 모바일 1장(다음 카드 살짝 보이게), 태블릿 2장, 데스크톱 3장 */}
      <Carousel
        className="mt-8"
        itemClassName="basis-4/5 sm:basis-[calc((100%-1.5rem)/2)] md:basis-[calc((100%-3rem)/3)]"
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={cn("block h-full rounded-lg", focusRing)}
          >
            <Card className="flex h-full flex-col gap-4 transition-colors hover:border-gray-300">
              {project.thumbnailUrl ? (
                <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={project.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <ImagePlaceholder ratio="16/9" />
              )}
              <div className="flex flex-col items-start gap-2">
                <Badge variant="brand">{project.cohort}</Badge>
                <h3 className="text-h3 text-text">{project.name}</h3>
                <p className="text-body-sm text-text-subtle">{project.summary}</p>
              </div>
            </Card>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
