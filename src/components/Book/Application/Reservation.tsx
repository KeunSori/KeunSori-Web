import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { useAtom } from "jotai";
import { endTimeAtom, printEndTimeAtom, startTimeAtom } from "../Time.ts";
import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import authApi from "../../../api/Instance/authApi.ts";
import { SlotButton } from "./styles/Button.tsx";
import useIsMobile from "../../mobile/useIsMobile.tsx";
import { useNavigate } from "react-router-dom";
import { TimeSlots } from "./styles/Times.tsx";
import { SlotContainer } from "./styles/Containers.tsx";
import { Month } from "../../BookMange/DateMange/monthData.ts";
import { formatDate, transDate } from "../../../utils/dateUtils.ts";

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
  const isMobile = useIsMobile();
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
          const userDate = new Date(transDate(data.date));
          return (
            userDate.getFullYear() === date.getFullYear() &&
            userDate.getMonth() === date.getMonth() &&
            userDate.getDate() === date.getDate()
          );
        });
        unAvailableSlot(newfilteredData);
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
          const userDate = new Date(transDate(user.reservationDate));
          return (
            userDate.getFullYear() === date.getFullYear() &&
            userDate.getMonth() === date.getMonth() &&
            userDate.getDate() === date.getDate()
          );
        });

        unAvailableSlots(newfilteredData);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
      navigate("/login");
    }
  };
  const unAvailableSlot = (data: Month) => {
    const start = baseSlots.findIndex((slot) => slot.time === data.startTime);
    const printend = baseSlots.findIndex((slot) => slot.time === data.endTime);
    const end = data.endTime === "23:00" ? 25 : printend - 1;
    setSelectedtSlots((prev) =>
      prev.map((slot, index) => {
        if (index < start || index > end) {
          return { ...slot, available: false };
        }
        return slot;
      })
    );
  };
  const unAvailableSlots = (data: UserInfo[]) => {
    if (
      today.getDate() === date?.getDate() &&
      today.getMonth() === date?.getMonth() &&
      today.getHours() > 10
    ) {
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

    data.forEach((user) => {
      if (team) {
        const start = baseSlots.findIndex(
          (slot) => slot.time === user.reservationStartTime
        );

        const printend = baseSlots.findIndex(
          (slot) => slot.time === user.reservationEndTime
        );
        const end = user.reservationEndTime === "23:00" ? 25 : printend - 1;

        setSelectedtSlots((prev) =>
          prev.map((slot, index) => {
            if (index >= start && index <= end) {
              return { ...slot, available: false };
            }
            return slot;
          })
        );
      } else if (
        user.reservationSession == instrument ||
        user.reservationSession == "all"
      ) {
        const start = baseSlots.findIndex(
          (slot) => slot.time === user.reservationStartTime
        );
        const printend = baseSlots.findIndex(
          (slot) => slot.time === user.reservationEndTime
        );
        const end = user.reservationEndTime === "23:00" ? 25 : printend - 1;
        setSelectedtSlots((prev) =>
          prev.map((slot, index) => {
            if (index >= start && index <= end) {
              return { ...slot, available: false };
            }
            return slot;
          })
        );
      }
    });
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
          <TimeSlots>
            {selectedSlots.map((slot, index) => (
              <div key={index}>
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                  `}
                >
                  <div
                    className={css`
                      height: 10px;
                    `}
                  >
                    {index % 2 === 0 && index / 2 + 10}{" "}
                  </div>
                  <SlotButton
                    key={index}
                    available={slot.available}
                    isMobile={isMobile}
                    selected={
                      (!!startTime &&
                        !!endTime &&
                        index >= startTime.index &&
                        index <= endTime.index) ||
                      startTime?.index === index
                    }
                    onClick={() =>
                      handleSlotClick(index, slot.time, slot.available)
                    }
                  ></SlotButton>
                </div>
              </div>
            ))}
          </TimeSlots>
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
