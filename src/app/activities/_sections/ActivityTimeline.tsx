import Link from "next/link";
import Image from "next/image";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { TimelineItem } from "@/shared/ui/TimelineItem";
import { cn, focusRing } from "@/shared/lib/cn";
import type { ActivitySummary } from "@/entities/activity/model";
import { EMPTY } from "./content";

/** 대표 사진 한 장. 주소가 없으면 자리표시자를 보여줘요 */
function Thumbnail({ activity, className }: { activity: ActivitySummary; className?: string }) {
  if (!activity.thumbnailUrl) {
    return <ImagePlaceholder ratio="4/3" className={className} />;
  }
  return (
    <div className={cn("relative aspect-4/3 overflow-hidden rounded-md bg-gray-100", className)}>
      <Image src={activity.thumbnailUrl} alt="" fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover" />
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
          <TimelineItem date={activity.date} last={index === activities.length - 1}>
            <Link href={`/activities/${activity.id}`} className={cn("block rounded-lg", focusRing)}>
              <Card className="flex flex-col items-stretch gap-3 transition-colors hover:border-gray-300 md:items-start">
                {/* 카드에는 대표 사진 하나만. 사진을 펼쳐 보는 건 상세의 일이에요 */}
                <Thumbnail activity={activity} className="order-first w-full md:order-none md:w-50" />
                <div className="order-none flex flex-col gap-1 md:order-first">
                  <h2 className="text-h3 text-text">{activity.title}</h2>
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
