import { atom } from "jotai";
// export interface Week {
//   dayOfWeekNum: number;
//   isActive: boolean;
//   startTime: string;
//   endTime: string;
// }
// export const weekDataAtom = atom<Week[]>([]);

export type ReservationType = "합주" | "교습" | "예약 유형";
export type ReservationSession = "보컬" | "키보드" | "드럼" | "기타" | "베이스";
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface TeamWeek {
  dayOfWeekNum: number; // 각 요일별 구분
  isActive: boolean;
  startTime: string;
  endTime: string;
  // 팀별 예약 정보
  regularReservations: [
    {
      regularReservationId: number;
      dayOfWeek: DayOfWeek;
      regularReservationStartTime: string;
      regularReservationEndTime: string;
      regularReservationType: ReservationType;
      regularReservationSession: ReservationSession;
      regularReservationTeamName: string;
      regularReservationApplyStartDate: string;
      regularReservationApplyEndDate: string;
      reservationMemberId: number;
      reservationMemberStudentId: string;
    }
  ];
}
export const teamWeekDataAtom = atom<TeamWeek[]>([]);
