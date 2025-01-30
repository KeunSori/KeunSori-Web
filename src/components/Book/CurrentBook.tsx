import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";
import Dropdown, { Option } from "react-dropdown";
import Notion from "./Notion.tsx";
import axiosInstance from "../../api/axiosInstance.ts";
import { UserInfo } from "../../data/user.ts";

const today = new Date();

const CurrentBook: React.FC = () => {
  const options = ["팀", "개인"];
  const options2 = ["보컬", "기타", "베이스", "드럼", "키보드"];
  const defaultOption = "신청 유형";
  const defaultOption2 = "악기";
  const [team, setTeam] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [instrument, setInstrument] = useState<string>("");
  const [date, setDate] = useState<Date | null>(today);
  const [UserData, setUserData] = useState<UserInfo[] | null>(null);
  const [filteredUserData, setFilteredUserData] = useState<UserInfo[] | null>(
    UserData
  );
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  const onTeamClick = (option: Option) => {
    if (option.value === "팀") {
      setTeam(true);
      setIndividual(false);
      setInstrument("");
    } else {
      setTeam(false);
      setIndividual(true);
    }
  };
  const onInstrumentClick = (option: Option) => {
    if (option.value === "보컬") {
      setInstrument("vocal");
    } else if (option.value === "기타") {
      setInstrument("guitar");
    } else if (option.value === "베이스") {
      setInstrument("bass");
    } else if (option.value === "드럼") {
      setInstrument("drum");
    } else if (option.value === "키보드") {
      setInstrument("keyboard");
    }
  };
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}${month}`;
  };

  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    console.log(`Token: ${token}`);
    try {
      const response = await axiosInstance.get(
        `/reservation/list?month=${formatDate(date)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      if (date) {
        const filteredData = response.data?.filter((user: UserInfo) => {
          const userDate = new Date(user.reservationDate);
          return isSameDay(userDate, date);
        });
        console.log(`Filtered data for ${date}:`, filteredData);
        setFilteredUserData(filteredData || null);
      }
    } catch (error) {
      console.log(`에러남:${error}`);
    }
  }
  const nextMonth = (date: Date) => {
    const today = new Date();
    return date.getMonth() - 1 > today.getMonth();
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
          onChange={onTeamClick}
          value={defaultOption}
          arrowClassName="custom-arrow"
          arrowClosed={<span className="arrow-closed">▼</span>}
          arrowOpen={<span className="arrow-open">▲</span>}
        />
        {individual && (
          <StyledDropdown
            options={options2}
            value={defaultOption2}
            onChange={onInstrumentClick}
            arrowClassName="custom-arrow"
            arrowClosed={<span className="arrow-closed">▼</span>}
            arrowOpen={<span className="arrow-open">▲</span>}
          />
        )}
      </div>
      <div
        className={css`
          margin: 20px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
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
          tileDisabled={({ date }) => nextMonth(date)}
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
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;
              height: 400px;
              max-height: 100%;
              padding: 20px 0px;
              margin-top: 40px;
              overflow-y: auto;
            `}
          >
            {filteredUserData?.map((user) =>
              team ? (
                user.reservationType === "team" && (
                  <Notion key={user.reservationId} user={user} />
                )
              ) : individual ? (
                instrument ? (
                  instrument === user.session && (
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
          </div>
        </div>
      </div>
    </>
  );
};
export default CurrentBook;

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
