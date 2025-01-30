import { atom } from "jotai";

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
export const isOpenAtom = atom<boolean>(false);
const today = new Date();
export const dateAtom = atom<Date | null>(today);
