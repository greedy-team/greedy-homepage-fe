// docs/openapi.yaml을 그대로 서빙해요. /api-docs 페이지의 Swagger UI가 이 주소를 읽어요.
// 개발 도구라 프로덕션에선 내려요.
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response(null, { status: 404 });
  }
  const yaml = await readFile(path.join(process.cwd(), "docs", "openapi.yaml"), "utf8");
  return new Response(yaml, { headers: { "Content-Type": "application/yaml; charset=utf-8" } });
}
