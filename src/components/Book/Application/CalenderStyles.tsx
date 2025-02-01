import styled from "@emotion/styled";

const CalendarStyles = styled.div<{ isMobile?: boolean }>`
  display: flex;
  justify-content: center;
  .react-calendar {
    width: ${(props) =>
      props.isMobile ? "300px !important" : "500px !important"};
    max-width: 100%;
    background: white;
    padding: 20px;
    border: none !important;
    border-radius: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    font-family: "Nanum Gothic", "sans-serif" !important;
    font-size: 10px;
    line-height: 1.3 !important;
  }
  .react-calendar__tile--disabled {
    background-color: black !important
    cursor: not-allowed !important;
    color: #f0f0f0 !important;
  }
  .react-calendar__navigation__prev-button {
    if (!nextMonth{date}) {
      display: none;
      cursor: not-allowed;
    }
  }
`;

export default CalendarStyles;
