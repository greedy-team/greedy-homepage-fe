// MSW 핸들러. entities/*/dto.ts에 이미 있는 목데이터를 그대로 응답으로 써요.(나중에 백앤드 배포되어도 예외대비용으로 남겨둘 수 있어요)
// docs/openapi.yaml(기준 스펙) 그대로 응답해요 — 나중에 백엔드가 그 스펙대로 배포되면 이 목서버와 응답이 같아요.
import { http, HttpResponse } from "msw";
import { PROJECT_DTOS } from "@/entities/project/dto";
import { MEMBER_DTOS } from "@/entities/member/dto";
import { ACTIVITY_DTOS } from "@/entities/activity/dto";

export const handlers = [
  // 목록은 배열을 그대로 응답해요.
  http.get("*/projects", () => HttpResponse.json(PROJECT_DTOS)),
  http.get("*/projects/:id", ({ params }) => {
    const id = Number(params.id);
    const dto = PROJECT_DTOS.find((project) => project.id === id);
    if (!dto) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(dto);
  }),
  
  // member는 entities/member/api.ts가 상세용 fetch 없이 이 목록만 써요(슬러그↔id 매핑표가 없어서).
  http.get("*/members", () => HttpResponse.json(MEMBER_DTOS)),

  // activity도 member와 같은 이유로 목록만 써요. ACTIVITY_DTOS는 백엔드 미구현이라 아직 빈 배열이에요.
  http.get("*/activities", () => HttpResponse.json(ACTIVITY_DTOS)),
];
