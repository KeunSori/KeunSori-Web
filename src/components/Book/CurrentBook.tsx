import { css } from "@emotion/css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const CurrentBook: React.FC = () => {
  return (
    <>
      <div
        className={css`
          margin: 30px 0px;
          display: flex;
          align-items: center;
          gap: 30px;
        `}
      >
        <Calendar
          calendarType="gregory"
          view="month"
          prev2Label={null}
          next2Label={null}
        />
        <div
          className={css`
            width: 2px;
            height: 250px;
            max-height: 100%;
            background-color: #f1f1f1;
          `}
        ></div>
        <div
          className={css`
            width: 350px;
          `}
        ></div>
      </div>
    </>
  );
};
export default CurrentBook;
