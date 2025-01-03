import { css } from "@emotion/css";
import styled from "@emotion/styled";
import "react-calendar/dist/Calendar.css";
import Dropdown from "react-dropdown";
const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
`;
const StyledDropdown = styled(Dropdown)`
  position: absolute;
  left: 20px;
  top: 10px;
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
const Notion = styled.div`
  width: 270px;
  max-width: 100%;
  height: 190px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;
const MyBook: React.FC = () => {
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
          margin: 20px 0px;
          display: flex;
          align-items: center;

          gap: 30px;
        `}
      >
        <div
          className={css`
            display: flex;
            height: 400px;

            max-height: 100%;
            padding: 20px 0px;
            margin-top: 30px;
          `}
        >
          <Notion>
            김홍대<Title>악기</Title>
            <Detail>Guiter</Detail>
            <div
              className={css`
                display: flex;
                justify-content: space-between;
                padding-right: 30px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f1f1f1;
              `}
            >
              <div>
                <Title>날짜</Title>
                <Detail>2025.01.01</Detail>
              </div>
              <div>
                <Title>시간</Title>
                <Detail>11:00 - 12:00</Detail>
              </div>
            </div>
            <div
              className={css`
                margin: 15px 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <div
                className={css`
                  font-weight: 700;
                  color: #68ae82;
                `}
              >
                예약 완료
              </div>
              <div
                className={css`
                  font-weight: 700;
                  color: #bbc5d5;
                  &:hover {
                    color: black;
                  }
                `}
              >
                예약 취소
              </div>
            </div>
          </Notion>
        </div>
      </div>
    </>
  );
};
export default MyBook;
