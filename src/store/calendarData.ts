import { atom } from "jotai";

export const startCalendarDateAtom = atom(new Date());
export const endCalendarDateAtom = atom(new Date());

export const filterStartDateAtom = atom(new Date());
export const filterEndDateAtom = atom(new Date());
