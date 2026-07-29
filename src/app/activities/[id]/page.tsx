import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/shared/ui/ImagePlaceholder";
import { TextLink } from "@/shared/ui/TextLink";
import { getActivities, getActivity } from "@/entities/activity/api";
import { formatActivityDateLabel } from "@/entities/activity/lib";
import { DETAIL } from "../_sections/content";
import { ActivityGallery } from "./_sections/ActivityGallery";
import { AdjacentNav } from "./_sections/AdjacentNav";

type Params = { id: string };

export async function generateStaticParams() {
  const activities = await getActivities();
  return activities.map((activity) => ({ id: String(activity.id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const activity = await getActivity(id);
  if (!activity) return {};
  return { title: activity.name, description: activity.description };
}

export default async function ActivityDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [activity, activities] = await Promise.all([getActivity(id), getActivities()]);
  if (!activity) notFound();

  const index = activities.findIndex((item) => String(item.id) === id);
  const prev = index > 0 ? activities[index - 1] : undefined;
  const next = index >= 0 && index < activities.length - 1 ? activities[index + 1] : undefined;
  const heroImageUrl = activity.images[0]?.url;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:px-20 md:py-20">
      <header className="flex flex-col gap-4">
        <TextLink variant="back" href="/activities">
          {DETAIL.back}
        </TextLink>
        <h1 className="text-display text-text">{activity.name}</h1>
        <p className="text-body text-text-subtle">
          {formatActivityDateLabel(activity.startDate, activity.endDate)}
        </p>
      </header>

      {/* 본문을 읽기 전의 앵커. 사진 주소가 확정되면 대표 사진이 들어와요 */}
      {heroImageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100">
          <Image src={heroImageUrl} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      ) : (
        <ImagePlaceholder ratio="16/9" label="대표 사진" />
      )}

      <section className="flex flex-col gap-4">
        {activity.description.split("\n").map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-line text-body text-gray-700">
            {paragraph}
          </p>
        ))}
      </section>

      <ActivityGallery activityTitle={activity.name} images={activity.images.map((image) => image.url)} />
      <AdjacentNav prev={prev} next={next} />
    </div>
  );
}
