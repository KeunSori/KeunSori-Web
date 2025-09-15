import styled from "@emotion/styled";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CalendarGlobalStyle } from "../../../../styles/Global/CalendarGlobalStyle";
import { ko } from "date-fns/locale";

interface CalendarItemProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const CalendarItem: React.FC<CalendarItemProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleSelectRange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (startDate) setStartDate(startDate);
    if (endDate) setEndDate(endDate);
    console.log("📅 Start:", startDate, "End:", endDate);
  };
  return (
    <Container>
      <CalendarGlobalStyle />
      <DateRange
        ranges={[
          {
            startDate,
            endDate,
            key: "selection",
          },
        ]}
        minDate={new Date()} // 오늘 이전은 선택 불가
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // 오늘 기준 1년 뒤까지 선택 가능
        onChange={handleSelectRange}
        locale={ko}
      />
    </Container>
  );
};

export default CalendarItem;

const Container = styled.div``;
