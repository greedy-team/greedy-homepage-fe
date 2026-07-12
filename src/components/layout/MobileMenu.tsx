"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { APPLY_FORM_URL, NAV_ITEMS, RECRUIT_FORM_URL } from "@/lib/site";
import { cn, focusRing } from "@/lib/cn";

type MobileMenuProps = {
  recruiting: boolean;
  pathname: string;
  className?: string;
};

/**
 * 좁은 화면의 햄버거 버튼과 메뉴 시트. 바는 그대로 두고 시트가 바 아래에서 열려요.
 * 햄버거는 제자리에서 ✕로 바뀌고, 뒤 화면은 반투명 스크림으로 가려요.
 */
export function MobileMenu({ recruiting, pathname, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // 열려 있는 동안 ESC로 닫을 수 있고, 뒤 화면 스크롤은 잠가요
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 메뉴가 열리면 바의 버튼은 사라지고, 시트 아래의 전체 폭 버튼이 그 역할을 이어받아요 */}
      <span
        inert={open}
        className={cn(
          "transition-opacity ease-out motion-reduce:transition-none",
          open ? "opacity-0" : "opacity-100",
        )}
        style={{ transitionDuration: "var(--duration-base)" }}
      >
        {recruiting ? (
          <Button size="md" href={APPLY_FORM_URL || "#"}>
            지원하기
          </Button>
        ) : (
          <Button size="md" variant="ghost" href={RECRUIT_FORM_URL || "#"}>
            모집 알림 받기
          </Button>
        )}
      </span>

      {/* 제자리에서 햄버거와 ✕가 바뀌어요. 로고와 버튼은 움직이지 않아요 */}
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn("relative z-50 inline-flex size-11 flex-col items-center justify-center gap-1", focusRing)}
      >
        {open ? (
          <span className="text-h3 text-text">&#10005;</span>
        ) : (
          <>
            <span className="h-0.5 w-5 rounded-full bg-text" />
            <span className="h-0.5 w-5 rounded-full bg-text" />
            <span className="h-0.5 w-5 rounded-full bg-text" />
          </>
        )}
      </button>

      {/* 시트와 스크림은 바(z-40)보다 아래 층에서, 바 높이(64px) 아래부터 열려요 */}
      <div inert={!open} className={cn("fixed inset-0 top-16 z-30", !open && "pointer-events-none")}>
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-gray-900/35 transition-opacity ease-out motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDuration: "var(--duration-base)" }}
        />
        <nav
          aria-label="메뉴"
          className={cn(
            "absolute inset-x-0 top-0 flex flex-col border-t border-border bg-bg px-5 pb-4",
            "transition-[translate,opacity] ease-out motion-reduce:transition-none",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
          style={{ transitionDuration: "var(--duration-base)" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-border py-4 text-body transition-colors",
                  active ? "font-semibold text-text" : "text-gray-700 hover:text-text",
                  focusRing,
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4">
            {recruiting ? (
              <Button href={APPLY_FORM_URL || "#"} className="w-full">
                지원하기
              </Button>
            ) : (
              <Button variant="ghost" href={RECRUIT_FORM_URL || "#"} className="w-full">
                모집 알림 받기
              </Button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
