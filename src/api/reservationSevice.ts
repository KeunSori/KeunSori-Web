import authApi from "./Instance/authApi";
import { UserInfo } from "../data/user";
import { Month } from "../components/BookMange/DateMange/monthData";
import { formatDate, isSameDate, transDate } from "../utils/dateUtils";

export const fetchMonthReservation = async (date: Date | null) => {
  try {
    const response = await authApi.get(
      `/reservation?month=${formatDate(date)}`
    );
    return filterMonthData(response.data, date);
  } catch (error) {
    console.log(`에러남:${error}`);
  }
};

const filterMonthData = (dataArray: Month[], date: Date | null) => {
  if (!date) return;
  return dataArray.find((data: Month) => {
    return isSameDate(new Date(transDate(data.date)), date);
  });
};
export const fetchReservationList = async (date: Date | null) => {
  try {
    const response = await authApi.get(
      `/reservation/list?month=${formatDate(date)}`
    );
    return filterUserData(response.data, date);
  } catch (error) {
    alert("로그인이 필요합니다.");
    console.log(`에러남:${error}`);
  }
};
const filterUserData = (dataArray: UserInfo[], date: Date | null) => {
  if (!date) return;
  return dataArray.filter((user: UserInfo) => {
    return isSameDate(new Date(transDate(user.reservationDate)), date);
  });
};
