import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Gnb } from "@/widgets/Gnb";
import { Footer } from "@/widgets/Footer";
import { SITE_NAME } from "@/shared/config/site";
import { NOT_FOUND } from "./_sections/content";
import { NotFoundView } from "./_sections/NotFoundView";

export const metadata: Metadata = {
  title: `${NOT_FOUND.title} - ${SITE_NAME}`,
  description: NOT_FOUND.description,
};

/**
 * 어떤 라우트와도 안 맞는 주소로 왔을 때. 라우팅 단계에서 바로 이 페이지를 줘요.
 * 레이아웃을 거치지 않아서 스타일·GNB·푸터를 여기서 직접 그려요 (layout.tsx와 같은 구성).
 */
export default function GlobalNotFound() {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Gnb />
        <main className="flex-1">
          <NotFoundView />
        </main>
        <Footer />
      </body>
    </html>
  );
}
