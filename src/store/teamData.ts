import { atom } from "jotai";

export type teamTypeType = "합주" | "교습" | null;
// 팀별 정기 예약 (관리자)
export const dayOfWeekNumAtom = atom(0);
export const teamNameAtom = atom("");
export const studentIdAtom = atom("");
export const typeAtom = atom<teamTypeType>(null);
export const teamStartTimeAtom = atom("10:00");
export const teamEndTimeAtom = atom("23:00");
