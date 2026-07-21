"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FilterChip } from "@/shared/ui/FilterChip";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ProjectSummary } from "@/entities/project/model";
import { ALL, EMPTY } from "./content";

type ProjectListProps = {
  projects: ProjectSummary[];
  cohorts: string[];
};

/** 기수 칩으로 거른 프로젝트 카드 그리드. 고른 기수에 프로젝트가 없으면 준비 중 화면을 보여줘요 */
export function ProjectList({ projects, cohorts }: ProjectListProps) {
  const [cohort, setCohort] = useState<string>(ALL);
  const filtered = cohort === ALL ? projects : projects.filter((project) => project.cohort === cohort);
  const empty = cohort === ALL ? EMPTY.all : EMPTY.cohort(cohort);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <FilterChip selected={cohort === ALL} onClick={() => setCohort(ALL)}>
          {ALL}
        </FilterChip>
        {cohorts.map((item) => (
          <FilterChip key={item} selected={cohort === item} onClick={() => setCohort(item)}>
            {item}
          </FilterChip>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.id}`} className={cn("block rounded-lg", focusRing)}>
                <Card className="flex h-full flex-col gap-4 transition-colors hover:border-gray-300">
                  {project.thumbnailUrl ? (
                    <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={project.thumbnailUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder ratio="16/9" />
                  )}
                  <div className="flex flex-col items-start gap-2">
                    <Badge variant="brand">{project.cohort}</Badge>
                    <h2 className="text-h3 text-text">{project.name}</h2>
                    <p className="text-body-sm text-text-subtle">{project.summary}</p>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={empty.title} description={empty.description} />
      )}
    </div>
  );
}
