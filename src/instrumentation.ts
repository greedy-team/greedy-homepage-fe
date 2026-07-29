/**
 * register()는 Next.js가 정한 특별한 이름이에요. 
 * 이 파일(instrumentation.ts)이 있으면 Next가 서버 인스턴스를 띄울 때(dev 서버 시작, next build가 페이지를 굽는 동안, next start)
 * 딱 한 번씩 이 함수를 자동으로 호출해요. 원래는 옵저버빌리티 툴 초기화용 훅인데,
 * 여기선 그 타이밍을 빌려서 MSW를 켜요.
 */
export async function register() {
  if (process.env.MSW_ENABLED === "true") {
    const { server } = await import("../mocks/node");
    server.listen({ onUnhandledRequest: "warn" }); 
    // 핸들러 빠뜨린 요청은 실백엔드로 나가되 콘솔에 경고를 남겨요
  }
}
