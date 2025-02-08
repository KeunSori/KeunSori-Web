import { atom } from "jotai";
import { Month } from "../BookMange/DateMange/monthData";

export interface instrument {
  vocal: boolean;
  guitar: boolean;
  bass: boolean;
  keyboard: boolean;
  drum: boolean;
}

interface Time {
  time: string;
  index: number;
}

export const startTimeAtom = atom<Time | null>(null);
export const endTimeAtom = atom<Time | null>(null);
export const printEndTimeAtom = atom<string>("");
export const isOpenAtom = atom<boolean>(false);
export const monthDataAtom = atom<Month[] | null>(null);
