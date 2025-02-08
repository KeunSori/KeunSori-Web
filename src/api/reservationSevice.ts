import authApi from "./Instance/authApi";
import { UserInfo } from "../data/user";
import { Month } from "../components/BookMange/DateMange/monthData";
import { formatDate, transDate } from "../utils/dateUtils";

export const fetchMonthReservation = async (date: Date | null) => {
  if (!date) return null;
  const response = await authApi.get(
    `/reservation/list?month=${formatDate(date)}`
  );
  return response.data;
};
export const fetchReservationList = async (date: Date | null) => {
  if (!date) return [];
  const response = await authApi.get(
    `/reservation/list?month=${formatDate(date)}`
  );
  return response.data;
};
export const filterMonthData = (dataArray: Month[], date: Date) => {
  return dataArray.find((data: Month) => {
    const userDate = new Date(transDate(data.date));
    return (
      userDate.getFullYear() === date.getFullYear() &&
      userDate.getMonth() === date.getMonth() &&
      userDate.getDate() === date.getDate()
    );
  });
};
export const filterUserData = (dataArray: UserInfo[], date: Date) => {
  return dataArray.filter((user: UserInfo) => {
    const userDate = new Date(transDate(user.reservationDate));
    return (
      userDate.getFullYear() === date.getFullYear() &&
      userDate.getMonth() === date.getMonth() &&
      userDate.getDate() === date.getDate()
    );
  });
};
