import { atom } from "jotai";
export interface Week {
  dayOfWeekNum: number;
  isActive: boolean;
  startTime: string;
  endTime: string;
}
export const weekDataAtom = atom<Week[]>([]);
