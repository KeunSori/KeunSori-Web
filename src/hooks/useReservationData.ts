import { useEffect, useState } from "react";
import { Month } from "../components/BookMange/DateMange/monthData";
import {
  fetchMonthReservation,
  fetchReservationList,
  filterMonthData,
  filterUserData,
} from "../api/reservationSevice";
import { UserInfo } from "../data/user";

export const useReservationData = (date: Date | null) => {
  const [monthData, setMonthData] = useState<Month | null>(null);
  const [userData, setUserData] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!date) return;
      try {
        const monthResponse = await fetchMonthReservation(date);
        if (monthResponse) {
          const filteredData = filterMonthData(monthResponse, date);
          setMonthData(filteredData || null);
        }
      } catch (error) {
        console.log(`에러남:${error}`);
      }
      try {
        const userResponse = await fetchReservationList(date);
        if (userResponse) {
          const filteredData = filterUserData(userResponse, date);
          setUserData(filteredData);
        }
      } catch (error) {
        console.log(`에러남:${error}`);
      }
    };

    fetchData();
  }, [date]);

  return { monthData, userData };
};
