import styled from "@emotion/styled";
import CalendarImg from "@/assets/reservation/calendar-keun.svg";
import CalendarItem from "./CalendarItem";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  endCalendarDateAtom,
  startCalendarDateAtom,
} from "@/store/calendarData";
import { formatDateYYYYMMDD } from "@/utils/dateUtils";

const CalendarInputs = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [startDate, setStartDate] = useAtom(startCalendarDateAtom);
  const [endDate, setEndDate] = useAtom(endCalendarDateAtom);

  // 클릭된 타켓이 안인지 밖인지 판단
  const calendarRef = useRef<HTMLDivElement>(null);

  const onShowCalendar = () => {
    setShowCalendar(true);
  };

  // 바깥 클릭 감지 -> 캘린더 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <Container>
      <ContainerFlex>
        <div>&nbsp;예약할 기간 입력:</div>
        <Flex>
          <div>{formatDateYYYYMMDD(startDate)}</div>
          <div>~</div>
          <div>{formatDateYYYYMMDD(endDate)}</div>
          <CalendarIcon src={CalendarImg} onClick={onShowCalendar} />
        </Flex>
      </ContainerFlex>
      {showCalendar && (
        <div
          ref={calendarRef}
          style={{ position: "absolute", marginLeft: 200 }}
        >
          <CalendarItem
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      )}
    </Container>
  );
};

export default CalendarInputs;

const Container = styled.div`
  gap: 8px;
  padding: 5px 0 10px 0;
  position: relative;
  z-index: 10;
`;

const ContainerFlex = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;
const Flex = styled.div`
  margin-left: 15px;
  display: flex;
  gap: 7px;
  align-items: center;
`;
const CalendarIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  &:hover {
    background-color: #dedede;
  }
`;
