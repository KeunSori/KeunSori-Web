import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { endTimeAtom, printEndTimeAtom, startTimeAtom } from "../Time.ts";
import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import authApi from "../../../api/Instance/authApi.ts";
import { useNavigate } from "react-router-dom";
import { SlotContainer } from "./styles/Containers.tsx";
import { Month } from "../../BookMange/DateMange/monthData.ts";
import { formatDate, isSameDate, transDate } from "../../../utils/dateUtils.ts";
import { TimeSlotsGrid } from "./TimeSlotsGrid.tsx";

const baseSlots = Array.from({ length: 26 }, (_, index) => ({
  time: `${10 + Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`,
  available: true,
}));
interface ReservationProps {
  date: Date | null;
  instrument: string;
  team: boolean;
}
const Reservation: React.FC<ReservationProps> = ({
  date,
  instrument,
  team,
}) => {
  const today = new Date();
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [, setPrintEndTime] = useAtom(printEndTimeAtom);
  const [selectedSlots, setSelectedtSlots] = useState(baseSlots);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!date) return;
    try {
      const response = await authApi.get(
        `/reservation?month=${formatDate(date)}`
      );
      if (date) {
        const newfilteredData = response.data.find((data: Month) => {
          return isSameDate(new Date(transDate(data.date)), date);
        });
        unAvailableSlots(undefined, newfilteredData);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
    }
    try {
      const response = await authApi.get(
        `/reservation/list?month=${formatDate(date)}`
      );

      if (date) {
        const newfilteredData = response.data.filter((user: UserInfo) => {
          return isSameDate(new Date(transDate(user.reservationDate)), date);
        });
        unAvailableSlots(newfilteredData);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
      navigate("/login");
    }
  };
  const getSlotIndex = (startTime: string, endTime: string) => {
    const startIndex = baseSlots.findIndex((slot) => slot.time === startTime);
    const printEnd = baseSlots.findIndex((slot) => slot.time === endTime);
    const endIndex = endTime === "23:00" ? 25 : printEnd - 1;
    return { startIndex, endIndex };
  };
  const unAvailableSlots = (userData?: UserInfo[], monthData?: Month) => {
    if (monthData) {
      const { startIndex, endIndex } = getSlotIndex(
        monthData.startTime,
        monthData.endTime
      );
      setSelectedtSlots((prev) =>
        prev.map((slot, index) => {
          if (index < startIndex || index > endIndex) {
            return { ...slot, available: false };
          }
          return slot;
        })
      );
    } else if (userData) {
      if (date && isSameDate(today, date) && today.getHours() > 10) {
        const nowTime = `${today.getHours()}:${
          today.getMinutes() > 30 ? "30" : "00"
        }`;
        const start = baseSlots.findIndex((slot) => slot.time === nowTime);
        if (start === -1) {
          setSelectedtSlots((prev) =>
            prev.map((slot) => {
              return { ...slot, available: false };
            })
          );
        }

        setSelectedtSlots((prev) =>
          prev.map((slot, index) => {
            if (index <= start) {
              return { ...slot, available: false };
            }
            return slot;
          })
        );
      }

      userData.forEach((user) => {
        if (team) {
          const { startIndex, endIndex } = getSlotIndex(
            user.reservationStartTime,
            user.reservationEndTime
          );
          setSelectedtSlots((prev) =>
            prev.map((slot, index) => {
              if (index >= startIndex && index <= endIndex) {
                return { ...slot, available: false };
              }
              return slot;
            })
          );
        } else if (
          user.reservationSession == instrument ||
          user.reservationSession == "all"
        ) {
          const { startIndex, endIndex } = getSlotIndex(
            user.reservationStartTime,
            user.reservationEndTime
          );
          setSelectedtSlots((prev) =>
            prev.map((slot, index) => {
              if (index >= startIndex && index <= endIndex) {
                return { ...slot, available: false };
              }
              return slot;
            })
          );
        }
      });
    }
  };
  const handleSlotClick = (index: number, time: string, available: boolean) => {
    if (available) {
      if (!startTime) {
        setStartTime({ time, index });
      } else if (startTime.index + 3 < index || startTime.index > index) {
        setStartTime({ time, index });
      } else if (!endTime) {
        const allSlotsAvailable = baseSlots
          .slice(startTime.index, index + 1)
          .every((slot) => slot.available);
        if (allSlotsAvailable) {
          setEndTime({ time, index });
          if (time[0] === "2" && time[1] === "2" && time[3] === "3") {
            setPrintEndTime("23:00");
          } else {
            setPrintEndTime(baseSlots[index + 1].time);
          }
        } else {
          setStartTime({ time, index });
          setEndTime(null);
          setPrintEndTime("");
        }
      }
      if (startTime && endTime) {
        if (startTime.index + 3 < index || startTime.index > index) {
          setStartTime({ time, index });
          setEndTime(null);
          setPrintEndTime("");
        } else if (endTime.index < index) {
          const allSlotsAvailable = baseSlots
            .slice(startTime.index, index + 1)
            .every((slot) => slot.available);
          if (allSlotsAvailable) {
            setEndTime({ time, index });
            if (time[0] === "2" && time[1] === "2" && time[3] === "3") {
              setPrintEndTime("23:00");
            } else {
              setPrintEndTime(baseSlots[index + 1].time);
            }
          } else {
            setStartTime({ time, index });
            setEndTime(null);
            setPrintEndTime("");
          }
        } else if (startTime.index < index || endTime.index > index) {
          setStartTime({ time, index });
          setEndTime(null);
          setPrintEndTime("");
        }
      }
    }
  };
  useEffect(() => {
    setStartTime(null);
    setEndTime(null);
    setPrintEndTime("");
    setSelectedtSlots(baseSlots);
    fetchData();
  }, [date, instrument, team]);

  return (
    <SlotContainer>
      <Time>
        <TimeContainer>
          <TimeSlotsGrid
            slots={selectedSlots}
            startTime={startTime}
            endTime={endTime}
            onSlotsClick={handleSlotClick}
          />
        </TimeContainer>
      </Time>
    </SlotContainer>
  );
};

export default Reservation;

const TimeContainer = styled.div`
  display: flex;
  padding: 0px 5px;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
`;
