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

  const [startDate, setStartDate] = useAtom(startCalendarDateAtom);
  const [endDate, setEndDate] = useAtom(endCalendarDateAtom);

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
      <ContainerFlex>
        <div>예약할 기간 입력:</div>
        <Flex>
          <div>{formatDateToString(startDate)}</div>
          <div>~</div>
          <div>{formatDateToString(endDate)}</div>
          <CalendarIcon src={CalendarImg} onClick={onShowCalendar} />
        </Flex>
      </ContainerFlex>
      {showCalendar && (
        <div style={{ position: "absolute", marginLeft: 200 }}>
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
  padding: 5px 0 30px 0;
  position: relative;
  z-index: 10;
`;

const ContainerFlex = styled.div`
  display: flex;
  gap: 104px;
  align-items: center;
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
