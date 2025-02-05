import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";
import Notion from "../Current/Notion.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";
import { UserInfo } from "../../../data/user.ts";
import { InstrumentDropBox, TeamDropBox } from "../Application/DropBox.tsx";
import OutContainer from "../OutContainer.tsx";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

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
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

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
    if (value === "보컬") {
      setInstrument("vocal");
    } else if (value === "기타") {
      setInstrument("guitar");
    } else if (value === "베이스") {
      setInstrument("bass");
    } else if (value === "드럼") {
      setInstrument("drum");
    } else if (value === "키보드") {
      setInstrument("keyboard");
    } else {
      setInstrument("");
    }
  };
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}${month}`;
  };

  async function fetchData() {
    try {
      const response = await axiosInstance.get(
        `/reservation/list?month=${formatDate(date)}`
      );
      setUserData(response.data);
      if (date) {
        const filteredData = response.data?.filter((user: UserInfo) => {
          const userDate = new Date(TransDate(user.reservationDate));
          return isSameDay(userDate, date);
        });
        setFilteredUserData(filteredData || null);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
      navigate("/login");
    }
  }
  const TransDate = (userDate: string) => {
    return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
  };

  const UnvailableMonth = (date: Date) => {
    return (
      date.getMonth() - 1 > today.getMonth() ||
      date.getMonth() < today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };

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
        <div
          className={css`
            width: 100%;
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          `}
        >
          <TeamDropBox onClick={onTeamClick} />
          {individual && <InstrumentDropBox onClick={onInstrumentClick} />}
        </div>
        <div
          className={css`
            margin: 20px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            @media (max-width: 768px) {
              flex-direction: column;
            }
          `}
        >
          <Calendar
            calendarType="gregory"
            view="month"
            value={date}
            onChange={handleDateChange}
            prev2Label={null}
            next2Label={null}
            formatDay={(_locale, date) => date.getDate().toString()}
            tileDisabled={({ date }) => UnvailableMonth(date)}
          />
          <div
            className={css`
              @media (max-width: 768px) {
                display: none;
              }
              width: 2px;
              height: 300px;
              max-height: 100%;
              background-color: #f1f1f1;
            `}
          ></div>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <p
              className={css`
                @media (max-width: 768px) {
                  display: block;
                  width: 60%;
                  text-align: center;
                  padding-bottom: 10px;
                  border-bottom: 1px solid rgb(187, 187, 187);
                }
                display: none;
              `}
            >
              예약 목록
            </p>
            <div
              className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 5px;
                padding-right: 10px;
                height: 350px;
                max-height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                wrap: no-wrap;

                ::-webkit-scrollbar {
                  width: 8px;
                }

                ::-webkit-scrollbar-thumb {
                  background-color: #bbb;
                  border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                  background-color: #888;
                }
              `}
            >
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
            </div>
          </div>
        </div>
      </OutContainer>
    </>
  );
};
const Application = styled.button`
  width: 250px;
  max-width: 100%;
  cursor: pointer;
  min-height: 50px;
  font-weight: 400;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #fec511;
  color: #fec511;
  &:hover {
    background-color: #fbe59d;
    color: white;
  }
`;

export default CurrentBook;
