import Image from "next/image";
import { Button } from "@/shared/ui/Button";
import { HERO } from "./content";
import { APPLY_FORM_URL, IS_RECRUITING, RECRUIT_FORM_URL, SITE_NAME } from "@/shared/config/site";

type HeroProps = {
  /** 모집 상태. 기본값은 site.ts의 IS_RECRUITING이에요. 특정 상태를 미리 보고 싶을 때만 넘겨요 */
  recruiting?: boolean;
};

/**
 * 랜딩 첫 화면. 브랜드 그린 배경에 소개와 CTA를 얹어요.
 * 모집 중이면 지원하기 + 모집 배지, 평시면 다음 기수 알림 받기로 전환돼요.
 */
export function Hero({ recruiting = IS_RECRUITING }: HeroProps) {
  const primary = recruiting
    ? { label: HERO.recruiting.cta, href: APPLY_FORM_URL || "#" }
    : { label: HERO.idle.cta, href: RECRUIT_FORM_URL || "#" };
  const caption = recruiting ? HERO.recruiting.caption : HERO.idle.caption;

  return (
    <section className="bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:px-20 md:py-28">
        <div className="flex flex-col items-start gap-6">
          {recruiting && (
            <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-caption font-semibold text-white">
              {HERO.recruiting.badge}
            </span>
          )}
          <h1 className="whitespace-pre-line text-h1 md:text-hero">{HERO.title}</h1>
          <p className="whitespace-pre-line text-body text-white/80">{HERO.subtitle}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="white" size="lg" href={primary.href} className="w-full sm:w-auto">
              {primary.label}
            </Button>
            <Button variant="outline-white" size="lg" href="/activities" className="w-full sm:w-auto">
              활동 보기
            </Button>
          </div>
          <p className="text-caption text-white/70">{caption}</p>
        </div>

        {/* 그리디 엠블럼. 브랜드 그린 배경과 어우러지는 원형 로고예요 */}
        <div className="hidden md:flex md:justify-center">
          <Image
            src="/greedy-emblem.png"
            alt={`${SITE_NAME} 엠블럼`}
            width={400}
            height={400}
            priority
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}
