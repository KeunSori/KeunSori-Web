import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";
import Notion from "../Notion/Notion.tsx";
import authApi from "../../../../api/Instance/authApi.ts";
import { UserInfo } from "../../../../data/user.ts";
import { InstrumentDropBox, TeamDropBox } from "../../DropBox/DropBox.tsx";
import OutContainer from "../../OutContainer.tsx";
import { useNavigate } from "react-router-dom";
import { transInstrumentToEng } from "../../../../utils/instrumentUtils.ts";
import {
  formatDate,
  isSameDate,
  transDate,
  unvailableMonth,
} from "../../../../utils/dateUtils.ts";
import {
  Application,
  CalendarContainer,
  Divider,
  InContainer,
  MobileNote,
  NotionContainer,
} from "./CurrentBookStyle.tsx";

const today = new Date();

const CurrentBook: React.FC = () => {
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [instrument, setInstrument] = useState<string>("");
  const [date, setDate] = useState<Date | null>(today);
  const [UserData, setUserData] = useState<UserInfo[] | null>(null);
  const [filteredUserData, setFilteredUserData] = useState<UserInfo[] | null>(
    UserData
  );
  const navigate = useNavigate();

  const onTeamClick = (value: string) => {
    if (value === "팀") {
      setTeam(true);
      setIndividual(false);
      setInstrument("");
    } else if (value === "개인") {
      setTeam(false);
      setIndividual(true);
    } else {
      setTeam(false);
      setIndividual(false);
      setInstrument("");
    }
  };
  const onInstrumentClick = (value: string) => {
    setInstrument(transInstrumentToEng(value));
  };

  async function fetchData() {
    try {
      const response = await authApi.get(
        `/reservation/list?month=${formatDate(date)}`
      );
      setUserData(response.data);
      if (date) {
        const filteredData = response.data?.filter((user: UserInfo) => {
          const userDate = new Date(transDate(user.reservationDate));
          return isSameDate(userDate, date);
        });
        setFilteredUserData(filteredData || null);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
      navigate("/login");
    }
  }

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };
  useEffect(() => {
    fetchData();
  }, [date]);
  return (
    <>
      <OutContainer>
        <InContainer>
          <TeamDropBox onClick={onTeamClick} />
          {individual && <InstrumentDropBox onClick={onInstrumentClick} />}
        </InContainer>
        <CalendarContainer>
          <Calendar
            calendarType="gregory"
            view="month"
            value={date}
            onChange={handleDateChange}
            prev2Label={null}
            next2Label={null}
            formatDay={(_locale, date) => date.getDate().toString()}
            tileDisabled={({ date }) => unvailableMonth(date)}
          />
          <Divider />
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <MobileNote>예약 목록</MobileNote>
            <NotionContainer>
              {filteredUserData?.map((user) =>
                team ? (
                  user.reservationType === "TEAM" && (
                    <Notion key={user.reservationId} user={user} />
                  )
                ) : individual ? (
                  instrument ? (
                    instrument === user.reservationSession && (
                      <Notion key={user.reservationId} user={user} />
                    )
                  ) : (
                    user.reservationType !== "team" && (
                      <Notion key={user.reservationId} user={user} />
                    )
                  )
                ) : (
                  <Notion key={user.reservationId} user={user} />
                )
              )}
              <Application onClick={() => navigate("/book?type=application")}>
                + 예약 신청 하기
              </Application>
            </NotionContainer>
          </div>
        </CalendarContainer>
      </OutContainer>
    </>
  );
};

export default CurrentBook;
