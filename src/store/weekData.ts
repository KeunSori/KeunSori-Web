import { DayOfWeek } from "@/utils/mapper/regularReservation/convertDayOfWeek";
import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import { ReservationSessionEng } from "@/utils/mapper/regularReservation/convertSession";
import { atom } from "jotai";
import { DateString, TimeString } from "./Time";

interface RegularReservation {
  regularReservationId: number; // 예약 고유 ID
  dayOfWeek: DayOfWeek | string;
  regularReservationStartTime: TimeString;
  regularReservationEndTime: TimeString;
  regularReservationType: ReservationType | string;
  regularReservationSession: ReservationSessionEng | string;
  regularReservationTeamName: string;
  regularReservationApplyStartDate: DateString;
  regularReservationApplyEndDate: DateString;
  TeamLeaderStudentId: string;
}

export interface TeamWeek {
  dayOfWeekNum: number; // 각 요일별 구분
  isActive: boolean;
  startTime: TimeString;
  endTime: TimeString;
  // 팀별 예약 정보
  regularReservations: RegularReservation[]; // 각 요일별 예약 정보
}
export const teamWeekDataAtom = atom<TeamWeek[]>([]);
export const fetchedTeamWeekDataAtom = atom<TeamWeek[]>([]);
export const reservationIdCounterAtom = atom(0);
// 기본 예약 관리
export const deletedReservationIdsAtom = atom<number[]>([]);
// 일자별 예약 관리 (체크된 예약 ID)
export const checkedDeleteIdsAtom = atom<number[]>([]);
