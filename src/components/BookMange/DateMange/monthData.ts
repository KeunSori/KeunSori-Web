import { atom } from "jotai";

export interface Month {
  date: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}
export const MonthDataAtom = atom<Month[]>([]);
