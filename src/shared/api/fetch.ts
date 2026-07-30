import { API_BASE_URL } from "./config";

/** 백엔드와 논의하여, 리스트를 { "items": [...] } 형태로 받기로 하였고 이에 대한 타입 정의를 선언했어요 */
type ListResponse<T> = { items: T[] };

/** 백엔드가 응답 없이 멈춰있으면 8초 후 포기하고 undefined를 줘요. */
const REQUEST_TIMEOUT_MS = 8_000;

/**
 * 실패(네트워크 오류, 타임아웃, 4xx/5xx)하면 undefined를 줘요. 화면이 그걸 받아 빈 상태를 그려요.
 * revalidateSeconds는 Next.js ISR 캐시 주기(초)예요. 0이면 캐싱하지 않아요.
 */
export async function fetchJson<T>(path: string, revalidateSeconds: number): Promise<T | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return undefined;
    return (await res.json()) as T;
  } catch {
    return undefined;
  }
}

/** 목록 전용. 실패하면 undefined 대신 빈 배열을 줘서 화면이 항상 배열을 다루게 해요 */
export async function fetchList<T>(path: string, revalidateSeconds: number): Promise<T[]> {
  const data = await fetchJson<ListResponse<T>>(path, revalidateSeconds);
  return data?.items ?? [];
}
