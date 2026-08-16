import Image from "next/image";
import { Button } from "@/shared/ui/Button";
import { HERO } from "./content";
import { APPLY_FORM_URL, IS_RECRUITING, SITE_NAME } from "@/shared/config/site";

type HeroProps = {
  /** 모집 상태. 기본값은 site.ts의 IS_RECRUITING이에요. 특정 상태를 미리 보고 싶을 때만 넘겨요 */
  recruiting?: boolean;
};

/**
 * 랜딩 첫 화면. 브랜드 그린 배경에 소개와 CTA를 얹어요.
 * 모집 중이면 지원하기 + 모집 배지를 보여주고, 평시에는 지원 CTA를 숨겨요.
 */
export function Hero({ recruiting = IS_RECRUITING }: HeroProps) {
  const showApplyCta = recruiting && Boolean(APPLY_FORM_URL);

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
            {showApplyCta && (
              <Button variant="white" size="lg" href={APPLY_FORM_URL} className="w-full sm:w-auto">
                {HERO.recruiting.cta}
              </Button>
            )}
            <Button variant="outline-white" size="lg" href="/activities" className="w-full sm:w-auto">
              활동 보기
            </Button>
          </div>
          {showApplyCta && <p className="text-caption text-white/70">{HERO.recruiting.caption}</p>}
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
