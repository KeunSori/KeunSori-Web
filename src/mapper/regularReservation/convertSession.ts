const SESSION_MAP = {
  보컬: "VOCAL",
  키보드: "KEYBOARD",
  드럼: "DRUM",
  기타: "GUITAR",
  베이스: "BASS",
  전체: "ALL",
} as const;

export type ReservationSession = keyof typeof SESSION_MAP;

export const convertSession = (session: ReservationSession) =>
  SESSION_MAP[session]; // 여기는 string 리턴
