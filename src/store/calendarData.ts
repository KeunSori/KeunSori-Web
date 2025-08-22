import { atom } from "jotai";

export const startCalendarDateAtom = atom(new Date());
export const endCalendarDateAtom = atom(new Date());

// 이번 달 첫째 날
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1); // 이번달 1일
firstDayOfMonth.setHours(0, 0, 0, 0);
// 이번 달 마지막 날
const lastDayOfMonth = new Date(firstDayOfMonth);
lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
lastDayOfMonth.setDate(0); // 다음달 0일
lastDayOfMonth.setHours(23, 59, 59, 999);

export const filterStartDateAtom = atom(firstDayOfMonth);
export const filterEndDateAtom = atom(lastDayOfMonth);
