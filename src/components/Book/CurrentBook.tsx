import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Dropdown from "react-dropdown";

const StyledDropdown = styled(Dropdown)`
  position: absolute;
  left: 20px;
  top: 15px;
  &:nth-child(2) {
    left: 130px;
  }
  .Dropdown-control {
    display: flex;
    background-color: white;
    color: black;
    width: 110px;
    height: 32px;
    font-size: 13px;
  }
  .Dropdown-menu {
    background-color: white;
    margin-left: 5px;
    width: 100px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  }

  .Dropdown-option {
    padding: 13px;
    &:hover,
    &:active {
      color: #ffaa00;
      font-weight: 600;
    }
  }
  .arrow-closed,
  .arrow-open {
    margin-left: 5px !important;
    font-size: 10px;
  }
`;
const CurrentBook: React.FC = () => {
  const options = ["팀", "개인"];
  const options2 = ["보컬", "기타", "베이스", "드럼", "키보드"];
  const defaultOption = "신청 유형";
  const defaultOption2 = "악기";

  return (
    <>
      <div
        className={css`
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        `}
      >
        <StyledDropdown
          options={options}
          value={defaultOption}
          arrowClassName="custom-arrow"
          arrowClosed={<span className="arrow-closed">▼</span>}
          arrowOpen={<span className="arrow-open">▲</span>}
        />
        <StyledDropdown
          options={options2}
          value={defaultOption2}
          arrowClassName="custom-arrow"
          arrowClosed={<span className="arrow-closed">▼</span>}
          arrowOpen={<span className="arrow-open">▲</span>}
        />
      </div>
      <div
        className={css`
          margin: 60px 0px;
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
