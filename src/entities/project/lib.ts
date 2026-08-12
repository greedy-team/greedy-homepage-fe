import type { StackPosition } from "./model";

const STACK_POSITION_LABEL: Record<StackPosition, string> = {
  FRONTEND: "FE",
  BACKEND: "BE",
  DESIGN: "디자이너",
};

/** 팀원 배지에 쓰는 한글/약어 라벨 */
export function formatStackPosition(position: StackPosition): string {
  return STACK_POSITION_LABEL[position];
}
