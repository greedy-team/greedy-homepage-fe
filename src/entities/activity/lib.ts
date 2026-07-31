
/**  ISO 날짜 문자열 표시 포맷. 타임존 오차를 피하려고 Date 객체 대신 문자열을 직접 split해요. 
 * 예)"2026-07-18" -> { year: 2026, month: 7, day: 18 }
*/
function toParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

/** 타임라인 옆 짧은 라벨 (예: "2026-07-18"-> "2026.07") */
export function formatActivityDateShort(startDate: string): string {
  const { year, month } = toParts(startDate);
  return `${year}.${String(month).padStart(2, "0")}`;
}

/** 상세 헤더의 날짜 문구. 시작·종료가 같은 날이면 하루로, 다르면 범위로 보여줘요. 
 * 백엔드에서 두 날짜를 주고, 날짜가 같으면 프론트에서 하루로 보여주기로 했어요.
 * 예: startDate="2026-07-18", endDate="2026-07-18" -> "2026년 7월 18일"
 */
export function formatActivityDateLabel(startDate: string, endDate: string): string {
  const start = toParts(startDate);
  if (startDate === endDate) {
    return `${start.year}년 ${start.month}월 ${start.day}일`;
  }
  // 하루(위에서 처리)를 지나면 여기부터 범위예요. 같은 달이면 끝 day만 추가, 다르면 양쪽 다 완전히 풀어요.
  const end = toParts(endDate);
  if (start.year === end.year && start.month === end.month) {
    return `${start.year}년 ${start.month}월 ${start.day}일~${end.day}일`;
  }
  return `${start.year}년 ${start.month}월 ${start.day}일~${end.year}년 ${end.month}월 ${end.day}일`;
}
