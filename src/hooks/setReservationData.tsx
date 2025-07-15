import { useEffect, useState } from "react";
import { Month } from "../components/BookMange/DateMange/monthData";
import { formatDate, isSameDate, transDate } from "../utils/dateUtils";
import authApi from "../api/Instance/authApi";

export const useReservationData = (date: Date | null) => {
  const [monthData, setMonthData] = useState<Month | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!date) return;
      try {
        const monthResponse = await await authApi.get(
          `/reservation/list?month=${formatDate(date)}`
        );
        if (monthResponse) {
          const filtered = monthResponse.data.find((data: Month) => {
            return isSameDate(new Date(transDate(data.date)), date);
          });
          setMonthData(filtered);
        }
      } catch (error) {
        console.error("Error fetching month reservation:", error);
      }
    };

    loadData();
  }, [date]);

  return monthData;
};
