import { atom } from "jotai";
import { Month } from "@/store/monthData.ts";

// 날짜와 시간 형식 고정
export type DateString = `${number}-${number}-${number}`; // YYYY-MM-DD
export type TimeString = `${number}:${number}`; // HH:MM

export interface TimeInfo {
  time: TimeString;
  index: number;
}

export const startTimeAtom = atom<TimeInfo | null>(null);
export const endTimeAtom = atom<TimeInfo | null>(null);
export const printEndTimeAtom = atom<string>("");
export const isOpenAtom = atom<boolean>(false);
export const monthDataAtom = atom<Month[] | null>(null);
