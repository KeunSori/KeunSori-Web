import { atom } from "jotai";
interface Time {
  time: string;
  index: number;
}

export const startTimeAtom = atom<Time | null>(null);
export const endTimeAtom = atom<Time | null>(null);
