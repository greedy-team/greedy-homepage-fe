import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ActivitySummary } from "@/entities/activity/model";

type ActivityPreviewProps = {
  activities: ActivitySummary[];
};

/** 최근 활동 미리보기. 데스크톱은 3개, 좁은 화면은 대표 1개만 보여줘요. */
export function ActivityPreview({ activities }: ActivityPreviewProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-20 md:py-20">
      <SectionHeader title="활동" moreHref="/activities" />
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {activities.map((activity, index) => (
          <li key={activity.id} className={cn(index > 0 && "hidden md:block")}>
            <Link href={`/activities/${activity.id}`} className={cn("block rounded-lg", focusRing)}>
              {activity.thumbnailUrl ? (
                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={activity.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <ImagePlaceholder ratio="4/3" />
              )}
              <p className="mt-3 text-body-sm text-text-subtle">{activity.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
