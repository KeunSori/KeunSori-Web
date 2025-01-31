import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import Calendar from "react-calendar";
import Reservation from "./Reservation.tsx";
import { useAtom } from "jotai";
import {
  dateAtom,
  endTimeAtom,
  startTimeAtom,
  instrument,
  printEndTimeAtom,
} from "../Time.ts";
import { Value } from "react-calendar/src/shared/types.js";
import { Button, ReservationButton } from "./Button.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";
import CalendarStyles from "./CalenderStyles.tsx";
import { InstrumentInfo } from "../../../data/user.ts";
import OutContainer from "../OutContainer.tsx";

const ApplicationBook: React.FC = () => {
  const defaultInstruments: InstrumentInfo = {
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
  const today = new Date();
  const [prinEndTime] = useAtom(printEndTimeAtom);

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
    console.log("value: ", value);
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
    const inst = Object.keys(instruments).find(([value]) => value);
    setInstrument(inst?.toString() || "");
    console.log(instrument);
    await axiosInstance.post("/reservation", {
      reservationType: team ? "TEAM" : "PERSONAL",
      reservationSession: team ? "ALL" : instrument,
      reservationDate: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
      reservationStartTime: startTime.time,
      reservationEndTime: endTime.time,
    });
    console.log("예약 완료");
    alert("예약이 완료되었습니다!");
    window.location.reload();
  };
  const nextMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() - 1 > today.getMonth();
  };

  return (
    <>
      <OutContainer>
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
                min-width: 70px;
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
                    min-width: 70px;
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
              <CalendarStyles>
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
              </CalendarStyles>
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
                    ? ` ${prinEndTime} 
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
      </OutContainer>
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
