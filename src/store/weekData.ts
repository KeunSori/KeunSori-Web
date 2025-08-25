import { DayOfWeek } from "@/utils/mapper/regularReservation/convertDayOfWeek";
import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import { ReservationSessionEng } from "@/utils/mapper/regularReservation/convertSession";
import { atom } from "jotai";

interface RegularReservation {
  regularReservationId: number; // 예약 고유 ID
  dayOfWeek: DayOfWeek | string;
  regularReservationStartTime: string;
  regularReservationEndTime: string;
  regularReservationType: ReservationType | string;
  regularReservationSession: ReservationSessionEng | string;
  regularReservationTeamName: string;
  regularReservationApplyStartDate: string;
  regularReservationApplyEndDate: string;
  TeamLeaderStudentId: string;
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
export const fetchedTeamWeekDataAtom = atom<TeamWeek[]>([]);
export const reservationIdCounterAtom = atom(0);
export const deletedReservationIdsAtom = atom<number[]>([]);
