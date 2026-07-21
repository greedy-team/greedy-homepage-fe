// docs/openapi.yaml을 Swagger UI로 보여주는 개발 전용 페이지예요. 프로덕션에선 404로 내려요.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SwaggerViewer } from "./_sections/SwaggerViewer";

export const metadata: Metadata = {
  title: "API 문서",
  robots: { index: false },
};

export default function ApiDocsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-20">
      <SwaggerViewer />
    </div>
  );
}
