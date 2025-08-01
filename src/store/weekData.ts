import { atom } from "jotai";
import { teamTypeType } from "./teamData";
export interface Week {
  dayOfWeekNum: number;
  isActive: boolean;
  startTime: string;
  endTime: string;
}
export const weekDataAtom = atom<Week[]>([]);

export interface TeamWeek {
  dayOfWeekNum: number; // 각 요일별 구분
  type: teamTypeType;
  teamName: string;
  studentId: string;
  teamStartTime: string;
  teamEndTime: string;
}
export const teamWeekDataAtom = atom<TeamWeek[]>([]);
