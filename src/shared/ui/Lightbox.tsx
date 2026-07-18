"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn, focusRing } from "@/shared/lib/cn";

type LightboxPhoto = {
  src: string;
  alt: string;
};

type LightboxProps = {
  photos: LightboxPhoto[];
  /** 처음 보여줄 사진 */
  initialIndex?: number;
  /** 사진 아래 캡션 (예: 그리디콘 2026 · 팀 프로젝트 발표) */
  caption?: string;
  onClose: () => void;
};

/** 어두운 스크림 위 조작부라 흰 글자를 써요 */
const controlClass = cn(
  "relative inline-flex size-11 items-center justify-center text-white transition-opacity hover:opacity-70",
  focusRing,
);

/**
 * 사진을 크게 보는 라이트박스. 화면을 덮는 만큼 사진 보기에만 써요.
 * ESC·스크림 클릭·✕로 닫고, ←/→와 화살표로 넘겨요. 좁은 화면은 화살표 대신 스와이프예요.
 * 열려 있는 동안 포커스를 안에 가두고, 닫히면 열었던 요소로 되돌아가요.
 */
export function Lightbox({ photos, initialIndex = 0, caption, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  // 포털은 브라우저에서만 가능해서, 서버 렌더에서는 false를 받아 그리지 않아요
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const many = photos.length > 1;

  const goTo = (next: number) => {
    setIndex((next + photos.length) % photos.length);
  };

  // 열리면 포커스를 다이얼로그로 옮기고, 닫히면 열었던 요소로 되돌려요. 뒤 화면 스크롤은 잠가요
  useEffect(() => {
    if (!mounted) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [mounted]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (many && event.key === "ArrowLeft") goTo(index - 1);
    if (many && event.key === "ArrowRight") goTo(index + 1);
    // 포커스를 안에 가둬요. 마지막에서 Tab, 처음에서 Shift+Tab이면 반대편으로 돌아가요
    if (event.key === "Tab" && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (!many || touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  if (!mounted || photos.length === 0) return null;

  // 조상에 transform이 있으면 fixed가 그 조상 기준이 돼서 화면을 못 덮어요. body로 포털을 띄워요
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? "사진 크게 보기"}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-50 flex flex-col bg-gray-900/85 outline-none"
    >
      {/* 스크림(배경) 클릭으로 닫혀요. 사진과 조작부 클릭은 여기까지 오지 않아요 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />
      <div className="relative flex justify-end p-4 md:p-5">
        <button type="button" aria-label="닫기" onClick={onClose} className={controlClass}>
          &#10005;
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-4 md:gap-6 md:px-10">
        {many && (
          <div className="hidden sm:block">
            <button type="button" aria-label="이전 사진" onClick={() => goTo(index - 1)} className={controlClass}>
              <span className="text-h2">&lsaquo;</span>
            </button>
          </div>
        )}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative h-full max-h-full w-full max-w-4xl overflow-hidden rounded-md"
        >
          <Image
            src={photos[index].src}
            alt={photos[index].alt}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        {many && (
          <div className="hidden sm:block">
            <button type="button" aria-label="다음 사진" onClick={() => goTo(index + 1)} className={controlClass}>
              <span className="text-h2">&rsaquo;</span>
            </button>
          </div>
        )}
      </div>
      <div className="relative flex flex-col items-center gap-1 p-5 text-center">
        {caption && <p className="text-body-sm text-white">{caption}</p>}
        {many && <p className="text-caption text-gray-300 sm:hidden">손가락으로 넘겨요</p>}
      </div>
    </div>,
    document.body,
  );
}
