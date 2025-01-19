import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Reservation from "./Reservation.tsx";
import { useAtom } from "jotai";
import { endTimeAtom, startTimeAtom } from "./Time.ts";
import { Value } from "react-calendar/src/shared/types.js";

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
  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);
  const [date, setDate] = useState<Date | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.action === "team") {
      setTeam(true);
      setIndividual(false);
      setInstrument(defaultInstrument);
    } else {
      setTeam(false);
      setIndividual(true);
    }
  };
  const onClickInstrument = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInstrument(defaultInstrument);
    const value = e.currentTarget.value as keyof instrument;
    setInstrument((prev) => ({ ...prev, [value]: !prev[value] }));
  };
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  return (
    <>
      <div
        className={css`
          padding-left: 20px;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(2, 1fr);
          width: 60%;
          display: grid;
          align-items: center;
          gap: 5px;
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
      instrument["keyboard"] ||
      team ? (
        <div
          className={css`
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
            flex-direction: column;
          `}
        >
          <div
            className={css`
              display: flex;
              justify-content: center;
              gap: 60px;
            `}
          >
            {" "}
            <div className={calendarStyles}>
              <Calendar
                calendarType="gregory"
                view="month"
                value={date}
                onChange={handleDateChange}
                prev2Label={null}
                next2Label={null}
                formatDay={(_locale, date) => date.getDate().toString()}
              />
            </div>
            <SelectedTime>
              <Time>
                {date
                  ? `날짜: ${date.getFullYear()}년 ${
                      date.getMonth() + 1
                    }월 ${date.getDate()}일`
                  : "날짜를 선택해주세요."}
              </Time>
              <Time>
                시작 시간:
                {startTime?.time
                  ? ` ${startTime.time} : ${
                      startTime.index % 2 === 0 ? " 00" : " 30"
                    }`
                  : " 00 : 00"}
              </Time>
              <Time>
                마감 시간:
                {endTime?.time
                  ? ` ${endTime.time} : ${
                      endTime.index % 2 === 0 ? " 00" : " 30"
                    }`
                  : ` 00 : 00`}
              </Time>
              <ReservationButton>예약하기</ReservationButton>
            </SelectedTime>
          </div>

          <Reservation />
        </div>
      ) : null}
    </>
  );
};
export default ApplicationBook;
const ReservationButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #fff4d5;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 100px;
  &:hover {
    background-color: #f9d835;
  }
`;
const Time = styled.div``;
const SelectedTime = styled.div`
  display: flex;
  padding-top: 40px;
  flex-direction: column;
  width: 200px;
  gap: 20px;
  font-size: 20px;
  font-weight: 300;
`;
const calendarStyles = css`
  .react-calendar {
    width: 500px !important;
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
`;
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
  width: 70px;

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
