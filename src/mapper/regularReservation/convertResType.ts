const TYPE_MAP = {
  합주: "TEAM",
  교습: "LESSON",
  "예약 유형": "",
} as const;

export type ReservationType = keyof typeof TYPE_MAP;

export const convertResType = (type: ReservationType) => TYPE_MAP[type]; // 여기는 string 리턴
