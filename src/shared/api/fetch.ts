import { API_BASE_URL } from "./config";

/** 백엔드와 논의하여, 리스트를 { "items": [...] } 형태로 받기로 하였고 이에 대한 타입 정의를 선언했어요 */
type ListResponse<T> = { items: T[] };

/**
 * 응답이 아예 안 오는 경우(백엔드가 죽지도, 에러를 주지도 않고 그냥 멈춰있는 경우)를 대비한 타임아웃이에요.
 * 특히 next build의 정적 생성 단계에서 이게 없으면 페이지 하나가 60초씩 멈추다 재시도를 반복해요
 * (직접 겪음 — MSW는 build의 워커에서 안 켜지니, API가 하나라도 안 붙어 있으면 그대로 노출돼요).
 */
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
