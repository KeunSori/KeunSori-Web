import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { useAtom } from "jotai";
import { endTimeAtom, printEndTimeAtom, startTimeAtom } from "../Time.ts";
import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance.ts";
import { SlotButton } from "./Button.tsx";

const slots = Array.from({ length: 26 }, (_, index) => ({
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
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [, setPrintEndTime] = useAtom(printEndTimeAtom);
  const [selectedSlots, setSelectedtSlots] = useState(slots);

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}${month}`;
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/reservation/list?month=${formatDate(date)}`
      );
      console.log(response.data);

      if (date) {
        const newfilteredData = response.data.filter((user: UserInfo) => {
          const userDate = new Date(user.reservationDate);
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
    }
  };
  const unAvailableSlots = (data: UserInfo[]) => {
    data.forEach((user) => {
      console.log("session: ", user.reservationSession);

      if (team) {
        const start = slots.findIndex(
          (slot) => slot.time === user.reservationStartTime
        );
        const end = slots.findIndex(
          (slot) => slot.time === user.reservationEndTime
        );
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
        const start = slots.findIndex(
          (slot) => slot.time === user.reservationStartTime
        );
        const end = slots.findIndex(
          (slot) => slot.time === user.reservationEndTime
        );
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
    console.log(instrument);
    if (available) {
      if (!startTime) {
        setStartTime({ time, index });
      } else if (startTime.index + 3 < index || startTime.index > index) {
        setStartTime({ time, index });
      } else if (!endTime) {
        const allSlotsAvailable = slots
          .slice(startTime.index, index + 1)
          .every((slot) => slot.available);
        if (allSlotsAvailable) {
          setEndTime({ time, index });
          setPrintEndTime(slots[index + 1].time);
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
          const allSlotsAvailable = slots
            .slice(startTime.index, index + 1)
            .every((slot) => slot.available);
          if (allSlotsAvailable) {
            setEndTime({ time, index });
            setPrintEndTime(slots[index + 1].time);
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
    setSelectedtSlots(slots);
    fetchData();
  }, [date, instrument, team]);

  return (
    <Container>
      <Time>
        <TimeContainer>
          <TimeSlots>
            {selectedSlots.map((slot, index) => (
              <>
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
              </>
            ))}
          </TimeSlots>
        </TimeContainer>
      </Time>
    </Container>
  );
};

export default Reservation;

const TimeContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0px 5px;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const TimeSlots = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0px 5px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  justify-content: center;
`;
