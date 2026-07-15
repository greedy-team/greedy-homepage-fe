"use client";

import { useRef } from "react";
import { cn, focusRing } from "@/shared/lib/cn";

type TabItem = { label: string; value: string };

type TabsProps = {
  items: TabItem[];
  /** 현재 선택된 탭의 value */
  value: string;
  onChange?: (value: string) => void;
  className?: string;
};

/**
 * 화면의 큰 구획을 전환하는 탭. 현재 위치는 굵은 검정 글자와 초록 밑줄로 표시해요.
 * 키보드는 좌우 화살표로 옮기고, Tab 키는 탭 묶음을 한 번에 지나가요.
 */
export function Tabs({ items, value, onChange, className }: TabsProps) {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = items.findIndex((item) => item.value === value);

  const moveTo = (rawIndex: number) => {
    if (items.length === 0) return;
    const next = (rawIndex + items.length) % items.length;
    buttonsRef.current[next]?.focus();
    onChange?.(items[next].value);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const key = event.key;
    if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") return;
    event.preventDefault();
    if (key === "ArrowRight") moveTo(index + 1);
    else if (key === "ArrowLeft") moveTo(index - 1);
    else if (key === "Home") moveTo(0);
    else moveTo(items.length - 1);
  };

  return (
    <div role="tablist" className={cn("flex gap-7 border-b border-border", className)}>
      {items.map((item, index) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              buttonsRef.current[index] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active || (activeIndex === -1 && index === 0) ? 0 : -1}
            onClick={() => onChange?.(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "relative pt-3 pb-3 text-body-sm transition-colors",
              active ? "font-semibold text-text" : "text-text-subtle hover:text-text",
              focusRing,
            )}
          >
            {item.label}
            {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />}
          </button>
        );
      })}
    </div>
  );
}
