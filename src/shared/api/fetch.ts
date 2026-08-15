import { API_BASE_URL } from "./config";

/** 백엔드와 논의하여, 리스트를 { "items": [...] } 형태로 받기로 하였고 이에 대한 타입 정의를 선언했어요 */
type ListResponse<T> = { items: T[] };

/** 백엔드가 4xx·5xx 응답에 담아 보내는 오류 본문이에요 */
export type ApiErrorPayload = {
  code?: number;
  message?: string;
};

/** HTTP 오류와 백엔드 오류 코드를 함께 전달해요 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** 백엔드가 응답 없이 멈춰있으면 8초 후 포기하고 undefined를 줘요. */
const REQUEST_TIMEOUT_MS = 8_000;

/**
 * 실패(네트워크 오류, 타임아웃, 4xx/5xx)하면 기본적으로 undefined를 줘요. 화면이 그걸 받아 빈 상태를 그려요.
 * throwOnError를 켜면 4xx/5xx의 상태·백엔드 오류 코드를 ApiError로 전달해요.
 * revalidateSeconds는 Next.js ISR 캐시 주기(초)예요. 0이면 캐싱하지 않아요.
 */
export async function fetchJson<T>(
  path: string,
  revalidateSeconds: number,
  options?: { throwOnError?: boolean },
): Promise<T | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const data = (await res.json().catch(() => undefined)) as T | ApiErrorPayload | undefined;
    if (!res.ok) {
      const error = data as ApiErrorPayload | undefined;
      if (options?.throwOnError) {
        throw new ApiError(error?.message ?? "API 요청에 실패했어요.", res.status, error?.code);
      }
      return undefined;
    }
    return data as T;
  } catch (error) {
    if (options?.throwOnError && error instanceof ApiError) throw error;
    return undefined;
  }
}

/** 목록 전용. 기본값은 실패하면 빈 배열을 주고, throwOnError를 켜면 ApiError를 전달해요 */
export async function fetchList<T>(
  path: string,
  revalidateSeconds: number,
  options?: { throwOnError?: boolean },
): Promise<T[]> {
  const data = await fetchJson<ListResponse<T>>(path, revalidateSeconds, options);
  return data?.items ?? [];
}
