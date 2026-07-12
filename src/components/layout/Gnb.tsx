"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { APPLY_FORM_URL, IS_RECRUITING, NAV_ITEMS, RECRUIT_FORM_URL, SITE_NAME } from "@/lib/site";
import { cn, focusRing } from "@/lib/cn";

type GnbProps = {
  /** 모집 상태. 기본값은 site.ts의 IS_RECRUITING이고, 스토리에서만 바꿔요 */
  recruiting?: boolean;
};

/** 모든 페이지 맨 위에 붙는 내비게이션. 현재 페이지는 검정 글자와 초록 밑줄로 표시해요 */
export function Gnb({ recruiting = IS_RECRUITING }: GnbProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-20">
        <Link href="/" aria-label={`${SITE_NAME} 홈`} className={cn("inline-flex items-center", focusRing)}>
          <Image src="/greedy-wordmark.svg" alt={SITE_NAME} width={90} height={22} priority />
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 items-center text-body-sm transition-colors",
                  active ? "font-semibold text-text" : "text-text-subtle hover:text-text",
                  focusRing,
                )}
              >
                {item.label}
                {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand" />}
              </Link>
            );
          })}
          {recruiting ? (
            <Button size="sm" href={APPLY_FORM_URL || "#"}>
              지원하기
            </Button>
          ) : (
            <Button size="sm" variant="ghost" href={RECRUIT_FORM_URL || "#"}>
              모집 알림 받기
            </Button>
          )}
        </div>

        {/* 모바일: 햄버거와 메뉴 시트 */}
        <MobileMenu recruiting={recruiting} pathname={pathname} className="md:hidden" />
      </nav>
    </header>
  );
}
