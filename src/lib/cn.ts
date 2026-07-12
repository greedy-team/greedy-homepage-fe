import { clsx, type ClassValue } from "clsx";

/** 조건부 클래스 결합 헬퍼 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** 키보드 포커스 표시. 누르는 것(버튼, 링크, 탭, 칩)에 공통으로 붙여요 */
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
