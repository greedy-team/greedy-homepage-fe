// 항상 실제 백엔드 주소예요. MSW_ENABLED=true면 instrumentation.ts가 이 주소로 가는 요청을 가로채요.
export const API_BASE_URL = process.env.API_BASE_URL ?? "";
