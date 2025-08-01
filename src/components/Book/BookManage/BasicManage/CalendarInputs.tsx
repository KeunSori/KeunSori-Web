import styled from "@emotion/styled";
import CalendarImg from "../../../../../public/image/calendar-keun.svg";
import CalendarItem from "./CalendarItem";
import { useState } from "react";
import { useAtom } from "jotai";
import {
  endCalendarDateAtom,
  startCalendarDateAtom,
} from "@/store/calendarData";

const CalendarInputs = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [startDate] = useAtom(startCalendarDateAtom);
  const [endDate] = useAtom(endCalendarDateAtom);

  const onShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDateToString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  return (
    <Container>
      <Flex>
        <div>해당 시간표 적용 기간</div>
        <Flex>
          <div>{formatDateToString(startDate)}</div>
          <div>~</div>
          <div>{formatDateToString(endDate)}</div>
        </Flex>
        <CalendarIcon src={CalendarImg} onClick={onShowCalendar} />
      </Flex>
      {showCalendar && (
        <div style={{ position: "absolute", marginLeft: 200 }}>
          <CalendarItem />
        </div>
      )}
    </Container>
  );
};

export default CalendarInputs;

const Container = styled.div`
  gap: 8px;
  padding: 5px 0 15px 0;
  position: relative;
  z-index: 10;
`;
const Flex = styled.div`
  margin-left: 25px;
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
