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
import { Button, ReservationButton } from "./styles/Button.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";
import CalendarStyles from "./CalenderStyles.tsx";
import { InstrumentInfo } from "../../../data/user.ts";
import OutContainer from "../OutContainer.tsx";
import useIsMobile from "../../mobile/useIsMobile.tsx";
import { SelectedTime, Time, Times } from "./styles/Times.tsx";
import {
  ButtonContainer,
  Container,
  InContainer,
  MidContainer,
  TypeContainer,
} from "./styles/Containers.tsx";

const ApplicationBook: React.FC = () => {
  const defaultInstruments: InstrumentInfo = {
    vocal: false,
    guitar: false,
    bass: false,
    keyboard: false,
    drum: false,
  };
  const isMobile = useIsMobile();
  const [team, setTeam] = useState<boolean>(false);
  const [individual, setIndividual] = useState<boolean>(false);
  const [instruments, setInstruments] =
    useState<instrument>(defaultInstruments);
  const [instrument, setInstrument] = useState<string>("");
  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);
  const [date, setDate] = useAtom(dateAtom);
  const today = new Date();
  const [printEndTime] = useAtom(printEndTimeAtom);

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
      date.getDate() < today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) return;
    const inst = Object.keys(instruments).find(([value]) => value);
    setInstrument(inst?.toString() || "");
    console.log(printEndTime);
    try {
      await axiosInstance.post("/reservation", {
        reservationType: team ? "TEAM" : "PERSONAL",
        reservationSession: team ? "ALL" : instrument,
        reservationDate: `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        reservationStartTime: startTime.time,
        reservationEndTime: printEndTime,
      });
      console.log("예약 완료");
      alert("예약이 완료되었습니다!");
      window.location.reload();
    } catch (e) {
      console.log(e);
      alert("다시 시도 해주세요.");
    }
  };
  const UnvailableMonth = (date: Date) => {
    return (
      date.getMonth() - 1 > today.getMonth() ||
      date.getMonth() < today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };

  return (
    <>
      <OutContainer>
        <MidContainer>
          <ButtonContainer>
            <TypeContainer>유형</TypeContainer>
            <Button
              isActive={team}
              isMobile={isMobile}
              onClick={onClick}
              data-action="team"
            >
              팀
            </Button>
            <Button
              isActive={individual}
              isMobile={isMobile}
              onClick={onClick}
              data-action="individual"
            >
              개인
            </Button>
          </ButtonContainer>
          {(team || individual) && (
            <>
              <ButtonContainer>
                <TypeContainer>악기</TypeContainer>
                <Button
                  isActive={instruments["guitar"]}
                  disabled={team}
                  isMobile={isMobile}
                  value="guitar"
                  onClick={onClickInstrument}
                >
                  기타
                </Button>
                <Button
                  isActive={instruments["vocal"]}
                  disabled={team}
                  isMobile={isMobile}
                  value="vocal"
                  onClick={onClickInstrument}
                >
                  보컬
                </Button>
                <Button
                  isActive={instruments["bass"]}
                  disabled={team}
                  isMobile={isMobile}
                  value="bass"
                  onClick={onClickInstrument}
                >
                  베이스
                </Button>
                <Button
                  isActive={instruments["drum"]}
                  disabled={team}
                  isMobile={isMobile}
                  value="drum"
                  onClick={onClickInstrument}
                >
                  드럼
                </Button>
                <Button
                  isActive={instruments["keyboard"]}
                  disabled={team}
                  isMobile={isMobile}
                  value="keyboard"
                  onClick={onClickInstrument}
                >
                  키보드
                </Button>
              </ButtonContainer>
            </>
          )}
        </MidContainer>
        {instruments["guitar"] ||
        instruments["vocal"] ||
        instruments["bass"] ||
        instruments["drum"] ||
        instruments["keyboard"] ||
        team ? (
          <InContainer isMobile={isMobile}>
            <Container isMobile={isMobile}>
              <CalendarStyles isMobile={isMobile}>
                <Calendar
                  calendarType="gregory"
                  view="month"
                  value={date}
                  onChange={handleDateChange}
                  prev2Label={null}
                  next2Label={null}
                  formatDay={(_locale, date) => date.getDate().toString()}
                  tileDisabled={({ date }: { date: Date }) =>
                    beforeToday(date) || UnvailableMonth(date)
                  }
                />
              </CalendarStyles>
              {isMobile && (
                <Reservation date={date} instrument={instrument} team={team} />
              )}
              <SelectedTime isMobile={isMobile}>
                <Times isMobile={isMobile}>
                  <Time>
                    {date
                      ? `날짜: ${date.getFullYear()}년 ${
                          date.getMonth() + 1
                        }월 ${date.getDate()}일`
                      : "날짜를 선택해주세요."}
                  </Time>
                  <Time>
                    시작 시간:
                    {startTime?.time ? ` ${startTime.time} ` : " 00:00"}
                  </Time>
                  <Time>
                    마감 시간:
                    {endTime?.time
                      ? ` ${printEndTime} 
                    `
                      : " 00:00"}
                  </Time>
                </Times>

                <ReservationButton
                  onClick={handleSubmit}
                  isMobile={isMobile}
                  disabled={!date || !startTime || !endTime}
                >
                  예약하기
                </ReservationButton>
              </SelectedTime>
            </Container>
            {!isMobile && (
              <Reservation date={date} instrument={instrument} team={team} />
            )}
          </InContainer>
        ) : null}
      </OutContainer>
    </>
  );
};
export default ApplicationBook;
