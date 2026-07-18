"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/shared/ui/Lightbox";
import { cn, focusRing } from "@/shared/lib/cn";
import { DETAIL } from "../../_sections/content";

/**
 * 활동 사진 모음. 4장 이하면 전부 펼치고, 넘으면 3장 + 남은 개수 타일로 줄여요.
 * 첫 화면 높이를 지켜서 본문과 이전 다음 내비에 잘 닿게 해요.
 * 사진을 누르면 그 사진부터, 모두 보기를 누르면 숨은 사진부터 라이트박스로 크게 봐요.
 */
export function ActivityGallery({ activityTitle, images }: { activityTitle: string; images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  const visible = images.length <= 4 ? images : images.slice(0, 3);
  const overflow = images.length - visible.length;
  const photos = images.map((src, index) => ({ src, alt: `${activityTitle} 사진 ${index + 1}` }));

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">{DETAIL.galleryTitle}</h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {visible.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              aria-label={`${activityTitle} 사진 ${index + 1} 크게 보기`}
              onClick={() => setOpenIndex(index)}
              className={cn(
                "relative block aspect-square w-full overflow-hidden rounded-md bg-gray-100",
                focusRing,
              )}
            >
              <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </button>
          </li>
        ))}
        {overflow > 0 && (
          <li>
            <button
              type="button"
              onClick={() => setOpenIndex(visible.length)}
              className={cn(
                "flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-md bg-gray-900 text-white transition-colors hover:bg-gray-700",
                focusRing,
              )}
            >
              <span className="text-h2">+{overflow}</span>
              <span className="text-body-sm text-gray-300">모두 보기</span>
            </button>
          </li>
        )}
      </ul>
      {openIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={openIndex}
          caption={activityTitle}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
