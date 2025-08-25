const KOR_TO_ENG = {
  보컬: "VOCAL",
  키보드: "KEYBOARD",
  드럼: "DRUM",
  기타: "GUITAR",
  베이스: "BASS",
  합주: "ALL",
} as const;

const ENG_TO_KOR = {
  VOCAL: "보컬",
  KEYBOARD: "키보드",
  DRUM: "드럼",
  GUITAR: "기타",
  BASS: "베이스",
  ALL: "합주",
} as const;

export type ReservationSessionEng = keyof typeof KOR_TO_ENG;
export type ReservationSessionKor = keyof typeof ENG_TO_KOR;

// 한글 -> 영어
export const convertSessionEng = (session: ReservationSessionEng) =>
  KOR_TO_ENG[session]; // 여기는 string 리턴

// 영어 -> 한글
export const convertSessionKor = (session: ReservationSessionKor) =>
  ENG_TO_KOR[session]; // 여기는 string 리턴
