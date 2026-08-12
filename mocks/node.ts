import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** src/instrumentation.ts가 서버 시작 시 한 번 listen해요. Node 런타임 전용 */
export const server = setupServer(...handlers);
