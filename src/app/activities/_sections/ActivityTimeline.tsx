import Link from "next/link";
import Image from "next/image";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { TimelineItem } from "@/shared/ui/TimelineItem";
import { cn, focusRing } from "@/shared/lib/cn";
import { formatActivityDateShort } from "@/entities/activity/lib";
import type { ActivitySummary } from "@/entities/activity/model";
import { EMPTY } from "./content";

/** 모바일에서는 첫 사진만, 데스크톱에서는 활동 사진을 최대 3장까지 가로로 보여줘요. */
function Thumbnail({ activity, className }: { activity: ActivitySummary; className?: string }) {
  const thumbnailUrls = activity.thumbnailUrls.slice(0, Math.min(activity.imageCount, 3));
  if (thumbnailUrls.length === 0) {
    return <ImagePlaceholder ratio="4/3" className={className} />;
  }

  return (
    <div className={cn("flex gap-2 overflow-hidden rounded-md bg-gray-100", className)}>
      {thumbnailUrls.map((thumbnailUrl, index) => (
        <div
          key={`${activity.id}-${index}`}
          className={cn(
            "relative aspect-4/3 min-w-0 flex-1 md:w-50 md:flex-none",
            index > 0 && "hidden md:block",
          )}
        >
          <Image src={thumbnailUrl} alt="" fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/**
 * 시간축으로 늘어놓은 활동 목록. 필터 없이 전부 보여줘요.
 * 언제는 날짜 축이, 무엇인지는 제목이 말해줘요.
 * 좁은 화면 카드는 사진이 위로 오고 설명 없이 제목만 보여요.
 */
export function ActivityTimeline({ activities }: { activities: ActivitySummary[] }) {
  if (activities.length === 0) {
    return <EmptyState title={EMPTY.title} description={EMPTY.description} />;
  }

  return (
    <ol>
      {activities.map((activity, index) => (
        <li key={activity.id}>
          <TimelineItem date={formatActivityDateShort(activity.startDate)} last={index === activities.length - 1}>
            <Link href={`/activities/${activity.id}`} className={cn("block rounded-lg", focusRing)}>
              <Card className="flex flex-col items-stretch gap-3 transition-colors hover:border-gray-300 md:items-start">
                {/* 카드에서는 활동 사진을 미리 보고, 사진을 크게 보는 건 상세의 일이에요 */}
                <Thumbnail activity={activity} className="order-first w-full md:order-none md:w-auto" />
                <div className="order-none flex flex-col gap-1 md:order-first">
                  <h2 className="text-h3 text-text">{activity.name}</h2>
                  <p className="hidden text-body-sm text-text-subtle md:block">{activity.summary}</p>
                </div>
              </Card>
            </Link>
          </TimelineItem>
        </li>
      ))}
    </ol>
  );
}
