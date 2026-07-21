// 백엔드 배포 전 개발용 MSW 목서버. MSW_ENABLED=true 환경변수를 준 로컬 dev에서만 켜져요.
// register()는 dev·prod 등 모든 환경에서 항상 호출되니, MSW_ENABLED 게이트를 지우면
// 실배포에서도 응답이 가로채질 수 있어요 — 지우지 마세요.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.MSW_ENABLED === "true") {
    const { server } = await import("./mocks/node");
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
