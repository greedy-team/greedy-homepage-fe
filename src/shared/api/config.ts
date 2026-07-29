// 항상 실제 백엔드 주소예요. MSW_ENABLED=true면 instrumentation.ts가 이 주소로 가는 요청을 가로채요.
// .env.local은 gitignore돼 있어서 새로 클론한 사람은 이 값이 없을 수 있어요. process.env.X는
// 타입이 항상 string | undefined라, ?? ""로 undefined를 막고 string 타입을 확정해둬요.
export const API_BASE_URL = process.env.API_BASE_URL ?? "";
