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
  originalIds: number[]
) => {
  return teamWeekData.flatMap((item) =>
    item.regularReservations
      .filter((r) => !originalIds.includes(r.regularReservationId)) // 서버에 없는 신규 예약만
      .map((r) => ({
        reservationType: r.regularReservationType,
        reservationSession: r.regularReservationSession,
        dayOfWeek: r.dayOfWeek,
        regularReservationTeamName: r.regularReservationTeamName,
        regularReservationStartTime: r.regularReservationStartTime,
        regularReservationEndTime: r.regularReservationEndTime,
        studentId: r.TeamLeaderStudentId, // 팀장 학생 ID
        applyStartDate: r.regularReservationApplyStartDate,
        applyEndDate: r.regularReservationApplyEndDate,
      }))
  );
};
