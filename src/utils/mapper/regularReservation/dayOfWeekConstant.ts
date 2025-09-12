// 문자열 요일 -> 숫자 변환 매핑
const dayOfWeekMap: Record<string, number> = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
};
export const dayOfWeekNumber = (dayOfWeekName: string) =>
  dayOfWeekMap[dayOfWeekName] ?? -1; // 잘못된 값이면 -1
