import { UserInfo } from "@/data/user";

export const getUserTitle = (user: UserInfo) => {
  return user.regularReservationTeamName || user.reservationMemberName;
};
