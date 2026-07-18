"use client";

import { useEffect, useRef, useState } from "react";
import { BottomCta } from "@/widgets/BottomCta";
import { cn } from "@/shared/lib/cn";

type BottomCtaRevealProps = {
  href: string;
  label: string;
  caption?: string;
};

/**
 * 히어로를 지나면 나타나는 하단 고정 CTA. 히어로 바로 뒤에 놓아요 — 이 자리의
 * 센티널이 화면 위로 사라지는 순간을 히어로를 지난 것으로 봐요.
 * 모션은 투명도·위치만 움직이고, prefers-reduced-motion이면 즉시 표시돼요.
 */
export function BottomCtaReveal({ href, label, caption }: BottomCtaRevealProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden />
      <BottomCta
        href={href}
        label={label}
        caption={caption}
        // 변형은 fixed인 CTA 자신에게 줘요. 감싸는 요소에 주면 fixed가 그 요소 기준이 돼요
        className={cn(
          "transition ease-out md:hidden motion-reduce:transition-none",
          passed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        style={{ transitionDuration: "var(--duration-base)" }}
        inert={!passed}
      />
    </>
  );
}
