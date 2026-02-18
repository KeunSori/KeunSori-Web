import { TimeString } from "@/store/Time";
import { TeamWeek } from "@/store/weekData";

// 팀별 예약 PUT 데이터 형식으로 변환

export const weeklyScheduleUpdateRequestList = (teamWeekData: TeamWeek[]) => {
  if (!teamWeekData) return [];

  return teamWeekData.map((item) => ({
    dayOfWeekNum: item.dayOfWeekNum,
    isActive: item.isActive,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
};

export const regularReservationCreateRequestList = (
  teamWeekData: TeamWeek[],
  fetchedTeamWeekData: TeamWeek[],
) => {
  const originalIds = fetchedTeamWeekData
    .flatMap((d) => d.regularReservations)
    .map((r) => r.regularReservationId);

  return teamWeekData.flatMap((item) =>
    item.regularReservations
      .filter((r) => !originalIds.includes(r.regularReservationId)) // 기존에 없던 예약만 포함
      .map((r) => ({
        reservationType: r.regularReservationType,
        reservationSession: r.regularReservationSession,
        dayOfWeek: r.dayOfWeek,
        regularReservationTeamName: r.regularReservationTeamName,
        regularReservationStartTime: r.regularReservationStartTime,
        regularReservationEndTime: r.regularReservationEndTime,
        studentId: r.teamLeaderStudentId,
        applyStartDate: r.regularReservationApplyStartDate,
        applyEndDate: r.regularReservationApplyEndDate,
      })),
  );
};

export const regularReservationTimeUpdateList = (
  current: TeamWeek[],
  original: TeamWeek[],
) => {
  const originalMap = new Map<
    number,
    {
      start: TimeString;
      end: TimeString;
    }
  >();

  original.forEach((day) => {
    day.regularReservations.forEach((r) => {
      originalMap.set(r.regularReservationId, {
        start: r.regularReservationStartTime,
        end: r.regularReservationEndTime,
      });
    });
  });

  return current.flatMap((item) =>
    item.regularReservations
      .filter((r) => {
        const original = originalMap.get(r.regularReservationId);
        if (!original) return false; // 신규는 제외

        // 시간 변경된 예약만 포함
        return (
          r.regularReservationStartTime !== original.start ||
          r.regularReservationEndTime !== original.end
        );
      })
      .map((r) => ({
        regularReservationId: r.regularReservationId,
        regularReservationStartTime: r.regularReservationStartTime,
        regularReservationEndTime: r.regularReservationEndTime,
      })),
  );
};
