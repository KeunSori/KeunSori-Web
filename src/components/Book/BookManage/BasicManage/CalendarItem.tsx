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
        editableDateInputs={true}
        onChange={handleSelectRange}
        locale={ko}
      />
    </Container>
  );
};

export default CalendarItem;

const Container = styled.div``;
