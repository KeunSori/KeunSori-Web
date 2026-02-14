import { RegularReservation, TeamWeek } from "@/store/weekData";

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
  console.log("studentID:", teamWeekData);
  const originalMap = new Map<number, RegularReservation>();

  fetchedTeamWeekData.forEach((day) => {
    day.regularReservations.forEach((r) => {
      originalMap.set(r.regularReservationId, r);
    });
  });
  return teamWeekData.flatMap((item) =>
    item.regularReservations
      .filter((r) => {
        const original = originalMap.get(r.regularReservationId);

        // ✅ 신규
        if (!original) return true;

        // ✅ 기존 + 변경됨
        return isReservationChanged(r, original);
      })
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

// 예약이 변경되었는지 비교하는 함수
function isReservationChanged(
  current: RegularReservation,
  original: RegularReservation,
) {
  return (
    current.regularReservationTeamName !==
      original.regularReservationTeamName ||
    current.regularReservationStartTime !==
      original.regularReservationStartTime ||
    current.regularReservationEndTime !== original.regularReservationEndTime
  );
}
