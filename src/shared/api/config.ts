// 항상 실제 백엔드 주소예요. MSW_ENABLED=true면 instrumentation.ts가 이 주소로 가는 요청을 가로채요.
// .env.local은 gitignore돼 있어서 새로 클론한 사람은 이 값이 없을 수 있어요. 값이 없을 때 빈 문자열을
// 쓰면, 서버에서 실행되는 fetch가 상대 URL을 못 읽어서 모든 요청이 조용히 실패하고 화면이 텅 비어요.
// 그래서 값이 없으면 대신 쓸 절대 URL을 기본값으로 둬요. fetch(요청 보내는 쪽)와 mocks/handlers.ts
// (MSW가 잡아채는 쪽)가 이 상수를 똑같이 가져다 쓰기 때문에, 실제 백엔드 주소와 달라도 둘은 항상
// 서로 맞아떨어져요. 포트만 next dev(3000)와 겹치지 않게 골라서, MSW가 안 켜졌을 때도 자기 자신에게
// 요청을 보내는 혼란을 피해요.
export const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:4000";
