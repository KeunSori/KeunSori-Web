const DayOfWeek_MAP = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
} as const;

export type DayOfWeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayOfWeek = keyof typeof DayOfWeek_MAP;

export const convertDayOfWeek = (dayOfWeek: DayOfWeek) =>
  DayOfWeek_MAP[dayOfWeek]; // 여기는 string 리턴
