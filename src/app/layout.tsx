import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Gnb } from "@/components/layout/Gnb";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - 세종대학교 개발 동아리`,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
