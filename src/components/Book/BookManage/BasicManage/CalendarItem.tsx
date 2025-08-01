import styled from "@emotion/styled";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CalendarGlobalStyle } from "../../../../styles/Global/CalendarGlobalStyle";
import {
  endCalendarDateAtom,
  startCalendarDateAtom,
} from "@/store/calendarData";
import { useAtom } from "jotai";

const CalendarItem = () => {
  const [startDate, setStartDate] = useAtom(startCalendarDateAtom);
  const [endDate, setEndDate] = useAtom(endCalendarDateAtom);

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
      />
    </Container>
  );
};

export default CalendarItem;

const Container = styled.div``;
