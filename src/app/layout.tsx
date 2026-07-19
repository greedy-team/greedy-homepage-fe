import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Gnb } from "@/widgets/Gnb";
import { Footer } from "@/widgets/Footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/config/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://greedy-homepage-fe.vercel.app"),
  title: {
    default: `${SITE_NAME} - 세종대학교 개발 동아리`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // 링크를 공유할 때 보이는 카드. 제목과 설명은 각 페이지 것을 이어받아요.
  // 이미지 구성 이유는 Figma "OG 이미지" 섹션에 있어요
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE_NAME} - 교내 개발 생태계의 선한 영향력을` }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Gnb />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
