import Image from "next/image";
import { LINKS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { TextLink } from "@/components/ui/TextLink";

/** 모든 페이지 맨 아래의 푸터. 연락처와 채널로 가는 조용한 링크만 둬요 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-12 md:px-20">
        <Image src="/greedy-wordmark.svg" alt={SITE_NAME} width={82} height={20} />
        <p className="text-body-sm text-text-subtle">{SITE_DESCRIPTION}</p>
        <div className="flex gap-5">
          <TextLink variant="quiet" href={LINKS.github}>
            GitHub
          </TextLink>
          <TextLink variant="quiet" href={LINKS.instagram}>
            Instagram
          </TextLink>
          <TextLink variant="quiet" href={`mailto:${LINKS.email}`}>
            문의하기
          </TextLink>
        </div>
        <p className="text-caption text-text-subtle">&copy; {new Date().getFullYear()} Greedy</p>
      </div>
    </footer>
  );
}
