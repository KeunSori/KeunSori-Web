import styled from "@emotion/styled";
import CalendarImg from "../../../../../public/image/calendar-keun.svg";
import CalendarItem from "./CalendarItem";
import { useState } from "react";
import { useAtom } from "jotai";
import { filterEndDateAtom, filterStartDateAtom } from "@/store/calendarData";
import { formatDateYYYYMMDD } from "@/utils/dateUtils";

const CalendarFilter = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [filterStartDate, setFilterStartDate] = useAtom(filterStartDateAtom);
  const [filterEndDate, setFilterEndDate] = useAtom(filterEndDateAtom);

  const onShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <Container>
      <ContainerFlex>
        <div>해당 기간 내에 완료된 예약 보기:</div>
        <Flex>
          <div>{formatDateYYYYMMDD(filterStartDate)}</div>
          <div>~</div>
          <div>{formatDateYYYYMMDD(filterEndDate)}</div>
          <CalendarIcon src={CalendarImg} onClick={onShowCalendar} />
        </Flex>
      </ContainerFlex>
      {showCalendar && (
        <div style={{ position: "absolute", marginLeft: 200 }}>
          <CalendarItem
            startDate={filterStartDate}
            endDate={filterEndDate}
            setStartDate={setFilterStartDate}
            setEndDate={setFilterEndDate}
          />
        </div>
      )}
    </Container>
  );
};

export default CalendarFilter;

const Container = styled.div`
  gap: 8px;
  padding: 10px 0 0 0;
  position: relative;
  z-index: 15;
`;

const ContainerFlex = styled.div`
  display: flex;
  gap: 5px;
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
