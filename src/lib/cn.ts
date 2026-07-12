import { clsx, type ClassValue } from "clsx";

/** 조건부 클래스 결합 헬퍼 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
