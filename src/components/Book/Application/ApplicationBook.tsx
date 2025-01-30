import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Reservation from "./Reservation.tsx";
import { useAtom } from "jotai";
import {
  dateAtom,
  endTimeAtom,
  isOpenAtom,
  startTimeAtom,
  instrument,
} from "../Time.ts";
import { Value } from "react-calendar/src/shared/types.js";
import { Button, ReservationButton } from "./Button.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";

const ApplicationBook: React.FC = () => {
  const defaultInstruments = {
    vocal: false,
    guitar: false,
    bass: false,
    keyboard: false,
    drum: false,
  };
  const [team, setTeam] = useState<boolean>(false);
  const [individual, setIndividual] = useState<boolean>(false);
  const [instruments, setInstruments] =
    useState<instrument>(defaultInstruments);
  const [instrument, setInstrument] = useState<string>("");
  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const today = new Date();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.dataset.action;
    if (action === "team") {
      setTeam(true);
      setIndividual(false);
      setInstruments(defaultInstruments);
      setInstrument("ALL");
    } else if (action === "individual") {
      setTeam(false);
      setIndividual(true);
    }
  };
  const onClickInstrument = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInstruments(defaultInstruments);
    const value = e.currentTarget.value as keyof instrument;
    setInstruments((prev) => ({ ...prev, [value]: !prev[value] }));
    setInstrument(value);
  };
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };
  const beforeToday = (date: Date) => {
    return (
      date.getDate() < today.getDate() && date.getMonth() <= today.getMonth()
    );
  };
  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) return;
    console.log(" type: ", instrument);
    await axiosInstance.post("/reservation", {
      reservationType: team ? "TEAM" : "PERSONAL",
      reservationSession: team ? instrument : "ALL",
      reservationDate: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate()}`,
      reservationStartTime: startTime.time,
      reservationEndTime: endTime.time,
    });
    console.log("예약 완료");
    alert("예약이 완료되었습니다!");
    setIsOpen(true);
  };
  const nextMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() - 1 > today.getMonth();
  };
  useEffect(() => {
    setTeam(false);
    setIndividual(false);
    setInstruments(defaultInstruments);
    setInstrument("");
    setDate(today);
  }, [isOpen]);
  return (
    <>
      <div>
        <div
          className={css`
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 5px;
          `}
        >
          <div
            className={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <div
              className={css`
                width: 70px;
              `}
            >
              신청 유형
            </div>
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
          </div>
          {(team || individual) && (
            <>
              <div
                className={css`
                  display: flex;
                  align-items: center;
                  gap: 8px;
                `}
              >
                <div
                  className={css`
                    width: 70px;
                  `}
                >
                  악기
                </div>
                <Button
                  isActive={instruments["guitar"]}
                  disabled={team}
                  value="guitar"
                  onClick={onClickInstrument}
                >
                  기타
                </Button>
                <Button
                  isActive={instruments["vocal"]}
                  disabled={team}
                  value="vocal"
                  onClick={onClickInstrument}
                >
                  보컬
                </Button>
                <Button
                  isActive={instruments["bass"]}
                  disabled={team}
                  value="bass"
                  onClick={onClickInstrument}
                >
                  베이스
                </Button>
                <Button
                  isActive={instruments["drum"]}
                  disabled={team}
                  value="drum"
                  onClick={onClickInstrument}
                >
                  드럼
                </Button>
                <Button
                  isActive={instruments["keyboard"]}
                  disabled={team}
                  value="keyboard"
                  onClick={onClickInstrument}
                >
                  키보드
                </Button>
              </div>
            </>
          )}
        </div>
        {instruments["guitar"] ||
        instruments["vocal"] ||
        instruments["bass"] ||
        instruments["drum"] ||
        instruments["keyboard"] ||
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
              <div className={calendarStyles}>
                <Calendar
                  calendarType="gregory"
                  view="month"
                  value={date}
                  onChange={handleDateChange}
                  prev2Label={null}
                  next2Label={null}
                  formatDay={(_locale, date) => date.getDate().toString()}
                  tileDisabled={({ date }: { date: Date }) =>
                    beforeToday(date) || nextMonth(date)
                  }
                />
              </div>
              <SelectedTime>
                <div>
                  {date
                    ? `날짜: ${date.getFullYear()}년 ${
                        date.getMonth() + 1
                      }월 ${date.getDate()}일`
                    : "날짜를 선택해주세요."}
                </div>
                <div>
                  시작 시간:
                  {startTime?.time ? ` ${startTime.time} ` : " 00:00"}
                </div>
                <div>
                  마감 시간:
                  {endTime?.time
                    ? ` ${endTime.time} 
                    `
                    : " 00:00"}
                </div>
                <ReservationButton
                  onClick={handleSubmit}
                  disabled={!date || !startTime || !endTime}
                >
                  예약하기
                </ReservationButton>
              </SelectedTime>
            </div>

            <Reservation date={date} instrument={instrument} team={team} />
          </div>
        ) : null}
      </div>
    </>
  );
};
export default ApplicationBook;

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
  .react-calendar__tile--disabled {
    background-color: #f0f0f0 !important;
    cursor: not-allowed !important;
  }
  .react-calendar__navigation__prev-button {
    if (!nextMonth{date}) {
      display: none;
      cursor: not-allowed;
    }
  }
`;
