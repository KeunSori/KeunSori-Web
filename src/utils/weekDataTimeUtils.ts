import { TeamWeek } from "@/store/weekData";

export type TimeType =
  | "startTime"
  | "endTime"
  | "teamStartTime"
  | "teamEndTime";

/**
 * 특정 요일의 시간(startTime or endTime)을 업데이트한 새로운 weekData 배열을 반환.
 *
 * @param weekData 기존 데이터
 * @param dayOfWeekNum 대상 요일 (0~6)
 * @param timeType 변경 대상 필드 ("startTime" | "endTime" | "teamStartTime" | "teamEndTime")
 * @param timeValue 변경할 값
 */

export function getUpdateWeekDateWithTime(
  weekData: TeamWeek[],
  dayOfWeekNum: number,
  timeType: TimeType,
  timeValue: string
): TeamWeek[] {
  return weekData.map((data) =>
    data.dayOfWeekNum === dayOfWeekNum
      ? { ...data, [timeType]: timeValue }
      : data
  );
}
