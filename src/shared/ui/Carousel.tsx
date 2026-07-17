"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { NavArrowButton } from "@/shared/ui/PrevNextNav";
import { cn } from "@/shared/lib/cn";

type CarouselProps = {
  /** 카드들. 각 자식이 한 칸이에요 */
  children: React.ReactNode;
  /** 한 칸의 너비. Tailwind 클래스로 줘요 */
  itemClassName?: string;
  className?: string;
};

type Metrics = {
  /** 카드 한 칸의 간격 포함 폭 */
  step: number;
  /** 한 화면에 온전히 들어가는 카드 수 */
  perPage: number;
  /** offsetLeft는 조상 기준이라, 첫 카드의 값을 기준점으로 삼아요 */
  baseOffset: number;
};

/**
 * 옆으로 넘겨 보는 목록. 자동 재생은 하지 않아요.
 * 화살표는 한 번에 보이는 만큼(한 화면) 넘겨서 클릭마다 이동량이 같고, 도트는 카드가 아니라 화면 수를 가리켜요.
 * 좁은 화면에서는 화살표를 숨기고 스와이프로 넘겨요.
 */
export function Carousel({ children, itemClassName = "w-80", className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<Metrics | null>(null);
  const frameRef = useRef(0);
  const count = Children.count(children);
  const [page, setPage] = useState(0);
  // 측정 전(서버 렌더 포함)에는 한 카드가 한 화면인 좁은 화면 기준으로 보여줘요
  const [pageCount, setPageCount] = useState(Math.max(1, count));

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return null;
    const first = track.children.item(0) as HTMLElement;
    const second = track.children.item(1) as HTMLElement | null;
    const step = second ? second.offsetLeft - first.offsetLeft : first.clientWidth;
    // 아직 레이아웃 전(숨겨진 탭 안 등)이면 측정하지 않아요. 보이게 되면 ResizeObserver가 다시 불러요
    if (step <= 0 || track.clientWidth <= 0) return null;
    const gap = step - first.clientWidth;
    const perPage = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    metricsRef.current = { step, perPage, baseOffset: first.offsetLeft };
    return metricsRef.current;
  }, []);

  const sync = useCallback(() => {
    const track = trackRef.current;
    const m = metricsRef.current ?? measure();
    if (!track || !m) return;
    const pages = Math.max(1, Math.ceil(count / m.perPage));
    setPageCount(pages);
    // 끝까지 스크롤되면 남은 카드가 화면보다 좁아 페이지 시작에 정렬될 수 없어서,
    // 끝 도달을 마지막 페이지로 봐요 (배율 확대 시 소수점 오차 여유 2px)
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      setPage(pages - 1);
      return;
    }
    const firstVisible = Math.round(track.scrollLeft / m.step);
    setPage(Math.min(pages - 1, Math.max(0, Math.floor(firstVisible / m.perPage))));
  }, [count, measure]);

  // 스크롤 이벤트는 프레임마다 여러 번 오니까, 한 프레임에 한 번만 계산해요
  const handleScroll = () => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      sync();
    });
  };

  useEffect(() => {
    measure();
    sync();
    const track = trackRef.current;
    if (!track) return;
    // 창이 아니라 트랙 자신의 크기를 지켜봐요. 부모 레이아웃이 바뀌는 경우까지 잡혀요
    const observer = new ResizeObserver(() => {
      measure();
      sync();
    });
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [measure, sync]);

  const goTo = (nextPage: number) => {
    const track = trackRef.current;
    const m = metricsRef.current ?? measure();
    if (!track || !m) return;
    const target = track.children.item(Math.min(count - 1, nextPage * m.perPage)) as HTMLElement | null;
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - m.baseOffset, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-center gap-4">
        {/* 버튼에 직접 hidden을 주면 기본 display에 밀려서 숨겨지지 않아요 */}
        <div className="hidden sm:block">
          <NavArrowButton direction="prev" onClick={() => goTo(page - 1)} disabled={page === 0} />
        </div>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex min-w-0 flex-1 snap-x snap-mandatory gap-6 overflow-x-auto pb-1 scrollbar-none"
        >
          {Children.map(children, (child) => (
            <div className={cn("shrink-0 snap-start", itemClassName)}>{child}</div>
          ))}
        </div>
        <div className="hidden sm:block">
          <NavArrowButton direction="next" onClick={() => goTo(page + 1)} disabled={page >= pageCount - 1} />
        </div>
      </div>
      <div className="flex justify-center gap-2" aria-hidden>
        {Array.from({ length: pageCount }, (_, i) => (
          <span
            key={i}
            className={cn("size-2 rounded-full transition-colors", i === page ? "bg-brand" : "bg-gray-200")}
          />
        ))}
      </div>
    </div>
  );
}
