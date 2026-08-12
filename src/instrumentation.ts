/**
 * register()는 Next.js가 정한 특별한 이름이에요. 
 * 이 파일(instrumentation.ts)이 있으면 Next가 서버 인스턴스를 띄울 때(dev 서버 시작, next build가 페이지를 굽는 동안, next start)
 * 딱 한 번씩 이 함수를 자동으로 호출해요. 원래는 옵저버빌리티 툴 초기화용 훅인데,
 * 여기선 그 타이밍을 빌려서 MSW를 켜요.
 */
export async function register() {
  // msw/node는 Node의 http/https를 직접 패치해서 Edge 런타임엔 없는 모듈을 가져와요.
  // Next는 instrumentation.ts를 nodejs·edge 두 런타임 모두를 위해 번들링하는데,
  // 이 체크가 없으면 edge용 번들이 그 모듈을 못 찾아서 빌드 자체가 깨져요(직접 겪음).
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.MSW_ENABLED === "true") {
    const { server } = await import("../mocks/node");
    server.listen({ onUnhandledRequest: "warn" }); // 핸들러 빠뜨린 요청은 실백엔드로 나가되 콘솔에 경고를 남겨요
  }
}
