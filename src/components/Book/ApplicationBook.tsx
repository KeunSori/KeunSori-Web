import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ButttonProps {
  isActive: boolean;
}
const Button = styled.button<ButttonProps>`
  background-color: ${({ isActive }) => (isActive ? "#ffe493" : "white")};
  color: ${({ isActive }) => (isActive ? "black" : "#7f8fa4")};
  border: ${({ isActive }) => (isActive ? "none" : "1px solid #7f8fa4")};
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffe493;
    color: black;
    border: none;
  }
  &:disabled {
    background-color: #f1f1f1;
    color: #b0b0b0;
    border: 1px solid #d1d1d1;
    cursor: not-allowed;
  }
`;

interface instrument {
  vocal: boolean;
  guitar: boolean;
  bass: boolean;
  keyboard: boolean;
  drum: boolean;
}
const ApplicationBook: React.FC = () => {
  const defaultInstrument = {
    vocal: false,
    guitar: false,
    bass: false,
    keyboard: false,
    drum: false,
  };
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [instrument, setInstrument] = useState<instrument>(defaultInstrument);
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.dataset.action === "team") {
      setTeam(true);
      setIndividual(false);
    } else {
      setTeam(false);
      setIndividual(true);
    }
  }
  function onClickInstrument(e: React.MouseEvent<HTMLButtonElement>) {
    setInstrument(defaultInstrument);
    const value = e.currentTarget.value as keyof instrument;
    setInstrument((prev) => ({ ...prev, [value]: !prev[value] }));
  }

  return (
    <>
      <div
        className={css`
          padding-left: 20px;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(2, 1fr);
          width: 60%;
          display: grid;
          gap: 10px;
          align-items: center;
        `}
      >
        신청 유형
        <Button isActive={team} onClick={onClick} data-action="team">
          팀
        </Button>
        <Button
          isActive={individual}
          onClick={onClick}
          data-action="individual"
        >
          개인
        </Button>
        <span></span>
        <span></span>
        <span></span>
        {(team || individual) && (
          <>
            악기
            <Button
              isActive={instrument["guitar"]}
              disabled={team}
              value="guitar"
              onClick={onClickInstrument}
            >
              기타
            </Button>
            <Button
              isActive={instrument["vocal"]}
              disabled={team}
              value="vocal"
              onClick={onClickInstrument}
            >
              보컬
            </Button>
            <Button
              isActive={instrument["bass"]}
              disabled={team}
              value="bass"
              onClick={onClickInstrument}
            >
              베이스
            </Button>
            <Button
              isActive={instrument["drum"]}
              disabled={team}
              value="drum"
              onClick={onClickInstrument}
            >
              드럼
            </Button>
            <Button
              isActive={instrument["keyboard"]}
              disabled={team}
              value="keyboard"
              onClick={onClickInstrument}
            >
              키보드
            </Button>
          </>
        )}
      </div>
      {instrument["guitar"] ||
      instrument["vocal"] ||
      instrument["bass"] ||
      instrument["drum"] ||
      instrument["keyboard"] ? (
        <div
          className={css`
            height: 380px;
            margin: 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
          `}
        >
          <Calendar
            calendarType="gregory"
            view="month"
            prev2Label={null}
            next2Label={null}
            formatDay={(_locale, date) => date.getDate().toString()}
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
      ) : null}
    </>
  );
};
export default ApplicationBook;
