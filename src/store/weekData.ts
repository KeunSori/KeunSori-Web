import { DayOfWeek } from "@/mapper/regularReservation/convertDayOfWeek";
import { ReservationType } from "@/mapper/regularReservation/convertResType";
import { ReservationSession } from "@/mapper/regularReservation/convertSession";
import { atom } from "jotai";
// export interface Week {
//   dayOfWeekNum: number;
//   isActive: boolean;
//   startTime: string;
//   endTime: string;
// }
// export const weekDataAtom = atom<Week[]>([]);

interface RegularReservation {
  dayOfWeek: DayOfWeek | string;
  regularReservationStartTime: string;
  regularReservationEndTime: string;
  regularReservationType: ReservationType | string;
  regularReservationSession: ReservationSession | string;
  regularReservationTeamName: string;
  regularReservationApplyStartDate: string;
  regularReservationApplyEndDate: string;
  reservationMemberStudentId: string;
}

interface DeleteReservation {
  deletedId: number;
}

export interface TeamWeek {
  dayOfWeekNum: number; // 각 요일별 구분
  isActive: boolean;
  startTime: string;
  endTime: string;

  // 팀별 예약 정보
  regularReservations: RegularReservation[]; // 각 요일별 예약 정보
}
export const teamWeekDataAtom = atom<TeamWeek[]>([]);
export const deletedReservationIdsAtom = atom<DeleteReservation[]>([]);
