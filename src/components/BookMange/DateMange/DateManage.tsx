import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";
import axiosInstance from "../../../api/axiosInstance.ts";
import { UserInfo } from "../../../data/user.ts";
import OutContainer from "../../Book/OutContainer.tsx";
// import { useNavigate } from "react-router-dom";
import NotionContainer from "../../Book/Current/NotionContainer.tsx";
import TimePicker from "../TImePicker.tsx";
import styled from "@emotion/styled";
import ManageNotion from "./ManageNotion.tsx";

const today = new Date();

const DateManage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [UserData, setUserData] = useState<UserInfo[] | null>(null);
  const [filteredUserData, setFilteredUserData] = useState<UserInfo[] | null>(
    UserData
  );
  // const navigate = useNavigate();
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };
  const handleClick =
    (timeType: "startTime" | "endTime") =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const value = e.currentTarget.getAttribute("value");
      if (value) {
        console.log(value);
      }
      console.log(timeType);
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
        `/admin/reservation/daily-schedule?month=${formatDate(date)}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
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
        <CalendarContainer>
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
          <Divider />
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <InContainer>
              {date ? (
                <>
                  <Input type="checkbox" checked={true} disabled={true} />
                  {date.getMonth() + 1}월 {date.getDate()}일
                  <TimePicker
                    data-action="startTime"
                    onClick={handleClick("startTime")}
                  />
                  부터
                  <TimePicker
                    data-action="endTime"
                    onClick={handleClick("endTime")}
                  />
                </>
              ) : (
                "날짜 정보 없음"
              )}
            </InContainer>
            <NotionContainer>
              {filteredUserData?.map((user) => (
                <div
                  key={user.reservationId}
                  className={css`
                    height: 210px;
                    margin: 10px;
                  `}
                >
                  <ManageNotion key={user.reservationId} user={user} />
                </div>
              ))}
            </NotionContainer>
          </div>
        </CalendarContainer>
        <StoreButton>저장하기</StoreButton>
      </OutContainer>
    </>
  );
};
export default DateManage;

const StoreButton = styled.button`
  position: absolute;
  left: 70%;
  background-color: #68ae82;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #5c9f78;
  }
`;
const Input = styled.input`
  width: 13px;
`;
const CalendarContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Divider = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  width: 2px;
  height: 300px;
  max-height: 100%;
  background-color: #f1f1f1;
`;
const InContainer = styled.div`
  @media (max-width: 768px) {
    display: block;
    width: 60%;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(187, 187, 187);
  }
  display: flex;
  align-items: center;
  gap: 10px;
`;
