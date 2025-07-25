export interface UserInfo {
  reservationId: number;
  reservationSession: string;
  reservationDate: string;
  reservationStartTime: string;
  reservationEndTime: string;
  reservationType: string;
  reservationMemberId: number;
  reservationMemberName: string;
}

export interface InstrumentInfo {
  vocal: boolean;
  guitar: boolean;
  bass: boolean;
  keyboard: boolean;
  drum: boolean;
}

export type memberStatus = "일반" | "관리자" | "승인 대기";