import { API_BASE_URL } from "./config";

/** 백엔드 목록 응답의 공통 형태예요. 화면에는 items만 전달해요. */
type ListResponse<T> = { items: T[] };

/**
 * 백엔드가 4xx·5xx 응답에 담아 보내는 오류 본문이에요.
 * HTTP 상태 코드와 별개로, 백엔드가 정의한 업무용 오류 code를 함께 담을 수 있어요.
 */
export type ApiErrorPayload = {
  code?: number;
  message?: string;
};

/**
 * HTTP 상태 코드와 백엔드 오류 코드를 함께 전달하는 오류예요.
 *
 * - status: HTTP 상태 코드예요(예: 404, 500). 네트워크 오류에는 없을 수 있어요.
 * - code: 백엔드가 정의한 업무용 오류 코드예요(예: 40402). 네트워크 오류에는 없어요.
 * - message: 사용자나 오류 화면에 보여줄 수 있는 메시지예요.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

/** 백엔드가 응답 없이 멈춰있으면 8초 후 요청을 포기해요. */
const REQUEST_TIMEOUT_MS = 8_000;

/**
 * 백엔드 JSON API를 호출해요.
 *
 * 기본 동작은 실패를 undefined로 바꿔요. 목록 화면은 이를 빈 배열로 바꿔서
 * API가 잠시 멈춰도 마지막 캐시나 빈 상태를 보여줄 수 있어요.
 * 오류 화면이나 모달에서 상태와 메시지를 직접 처리할 때는 throwOnError를 켜요.
 *
 * Axios 대신 fetch를 사용하는 이유는 Next.js fetch가 제공하는
 * `next.revalidate`를 그대로 사용해 ISR 캐시를 유지하기 위해서예요.
 * fetch는 4xx·5xx에서 자동으로 reject하지 않으므로 response.ok를 직접 확인해요.
 *
 * @param path API 경로예요. 예: `/members/1`
 * @param revalidateSeconds ISR 캐시를 다시 생성할 주기예요. 초 단위이며 0이면 캐시하지 않아요.
 * @param options `throwOnError`가 true면 모든 요청 오류를 ApiError로 전달해요.
 * @returns 성공하면 JSON 데이터, 기본 오류 처리에서는 undefined를 반환해요.
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

    let data: T | ApiErrorPayload | undefined;
    try {
      data = (await res.json()) as T | ApiErrorPayload;
    } catch (error) {
      if (!res.ok) {
        if (options?.throwOnError) {
          throw new ApiError("API 오류 응답을 읽지 못했어요.", res.status, undefined, { cause: error });
        }
        return undefined;
      }
      if (options?.throwOnError) {
        throw new ApiError("API 응답을 읽지 못했어요.", undefined, undefined, { cause: error });
      }
      return undefined;
    }

    if (!res.ok) {
      const error = data as ApiErrorPayload | undefined;
      if (options?.throwOnError) {
        throw new ApiError(error?.message ?? "API 요청에 실패했어요.", res.status, error?.code);
      }
      return undefined;
    }
    return data as T;
  } catch (error) {
    if (!options?.throwOnError) return undefined;
    if (error instanceof ApiError) throw error;
    throw new ApiError("네트워크 요청에 실패했어요.", undefined, undefined, { cause: error });
  }
}

/**
 * `{ items: [...] }` 형태의 목록 API를 호출해요.
 * 기본값은 실패하면 빈 배열을 반환하고, throwOnError를 켜면 ApiError를 전달해요.
 *
 * @param path 목록 API 경로예요.
 * @param revalidateSeconds ISR 캐시를 다시 생성할 주기예요. 초 단위예요.
 * @param options 모든 요청 오류를 호출부에서 직접 처리할지 정해요.
 * @returns 응답의 items 배열. 응답이 없거나 실패하면 빈 배열이에요.
 */
export async function fetchList<T>(
  path: string,
  revalidateSeconds: number,
  options?: { throwOnError?: boolean },
): Promise<T[]> {
  const data = await fetchJson<ListResponse<T>>(path, revalidateSeconds, options);
  return data?.items ?? [];
}
