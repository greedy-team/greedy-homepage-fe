"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/shared/ui/Lightbox";
import { cn, focusRing } from "@/shared/lib/cn";

/**
 * 화면 모음. 이미지가 없으면 아무것도 그리지 않아요 (아직 화면이 없는 프로젝트).
 * 네 칸을 넘으면 마지막 칸이 남은 개수를 알리는 +n 칸이 돼요.
 * 사진을 누르면 그 사진부터, 모두 보기를 누르면 숨은 사진부터 라이트박스로 크게 봐요.
 */
export function ScreenGallery({ projectName, images }: { projectName: string; images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  const visible = images.length <= 4 ? images : images.slice(0, 3);
  const overflow = images.length - visible.length;
  const photos = images.map((src, index) => ({ src, alt: `${projectName} 화면 ${index + 1}` }));

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-h3 text-text">화면</h2>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {visible.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              aria-label={`${projectName} 화면 ${index + 1} 크게 보기`}
              onClick={() => setOpenIndex(index)}
              className={cn(
                "relative block aspect-square w-full overflow-hidden rounded-md bg-gray-100",
                focusRing,
              )}
            >
              {/* 실제 이미지 주소가 확정되면 next.config의 images.remotePatterns에 호스트를 추가해요 */}
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
          caption={`${projectName} · 화면`}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
