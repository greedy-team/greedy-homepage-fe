// MSW 핸들러. entities/*/dto.ts에 이미 있는 목데이터를 그대로 응답으로 써요.(나중에 백앤드 배포되어도 예외대비용으로 남겨둘 수 있어요)
// 백엔드 실제 스펙(openapi.yaml) 기준 타입이라, 나중에 entities/*/api.ts가 이 URL로 fetch를 붙이면 그대로 맞아요.
import { http, HttpResponse } from "msw";
import { PROJECT_DTOS } from "@/entities/project/dto";

export const handlers = [
  // 목록은 배열을 바로 안 주고 { items: [...] }로 감싸요(실제 스펙 확인함).
  http.get("*/projects", () => HttpResponse.json({ items: PROJECT_DTOS })),
  http.get("*/projects/:id", ({ params }) => {
    const id = Number(params.id);
    const dto = PROJECT_DTOS.find((project) => project.id === id);
    if (!dto) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(dto);
  }),
];
