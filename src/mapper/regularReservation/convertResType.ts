import { ReservationSession } from "./convertSession";

const TYPE_MAP = {
  합주: "TEAM",
  교습: "LESSON",
  "예약 유형": "",
} as const;

export type ReservationType = keyof typeof TYPE_MAP;

export const convertResType = (type: ReservationType | ReservationSession) =>
  type in TYPE_MAP ? TYPE_MAP[type as ReservationType] : ""; // 없는 경우 빈 문자열 반환
