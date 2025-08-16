import { deletedReservationIdsAtom, teamWeekDataAtom } from "@/store/weekData";
import { useAtom } from "jotai";

// 팀별 예약 PUT 데이터 형식으로 변환

export const weeklyScheduleUpdateRequestList = () => {
  const [teamWeekData] = useAtom(teamWeekDataAtom);

  return teamWeekData.map((item) => ({
    dayOfWeekNum: item.dayOfWeekNum,
    isActive: item.isActive,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
};

export const regularReservationCreateRequestList = () => {
  const [teamWeekData] = useAtom(teamWeekDataAtom);

  return teamWeekData.flatMap((item) =>
    item.regularReservations.map((r) => ({
      dayOfWeek: r.dayOfWeek,
      regularReservationStartTime: r.regularReservationStartTime,
      regularReservationEndTime: r.regularReservationEndTime,
      reservationType: r.regularReservationType,
      reservationSession: r.regularReservationSession,
      regularReservationTeamName: r.regularReservationTeamName,
      applyStartDate: r.regularReservationApplyStartDate,
      applyEndDate: r.regularReservationApplyEndDate,
      studentId: r.reservationMemberStudentId,
    }))
  );
};

export const deleteRegularReservationIds = () => {
  const [deletedIds] = useAtom(deletedReservationIdsAtom);
  return deletedIds; // 삭제 시 기록한 ID 배열
};
