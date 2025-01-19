import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { useAtom } from "jotai";
import { endTimeAtom, startTimeAtom } from "./Time.ts";

const slots = Array.from({ length: 26 }, (_, index) => ({
  time: `${10 + Math.floor(index / 2)}`, // 오전 10시부터 30분 단위로
  // 예약 가능 여부 9시부터 18시까지만 예약 가능
  available: index <= 17 ? true : false,
}));

const Reservation = () => {
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const handleSlotClick = (index: number, time: string, available: boolean) => {
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
        } else {
          setStartTime({ time, index });
          setEndTime(null);
        }
      }
      if (startTime && endTime) {
        if (startTime.index + 3 < index || startTime.index > index) {
          setStartTime({ time, index });
          setEndTime(null);
        } else if (endTime.index < index) {
          const allSlotsAvailable = slots
            .slice(startTime.index, index + 1)
            .every((slot) => slot.available);
          if (allSlotsAvailable) {
            setEndTime({ time, index });
          } else {
            setStartTime({ time, index });
            setEndTime(null);
          }
        } else if (startTime.index < index || endTime.index > index) {
          setStartTime({ time, index });
          setEndTime(null);
        }
      }
    }
  };

  return (
    <Container>
      <Time>
        <TimeContainer>
          <TimeSlots>
            {slots.map((slot, index) => (
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
                    {index % 2 === 0 && slot.time}{" "}
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

// Styled Components
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
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  ::-webkit-scrollbar {
    display: none;
  }
  justify-content: center;
`;

const SlotButton = styled.button<{ available: boolean; selected: boolean }>`
  flex-shrink: 0;
  width: 30px;
  height: 50px;
  border: solid 1px #f1f1f1;
  background-color: ${({ available, selected }) =>
    selected
      ? "#ffe187"
      : available
      ? "white" // 예약 가능(파란색)
      : "#DDDDDD"}; // 마감(회색)
  color: ${({ available }) => (available ? "black" : "gray")};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  font-size: 14px;

  &:hover {
    background-color: ${({ available }) =>
      available ? "#FFAA00" : "#DDDDDD"}; // 예약 가능 시 hover 효과
  }
`;
