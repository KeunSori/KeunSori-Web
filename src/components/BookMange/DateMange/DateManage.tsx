import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";
import authApi from "../../../api/Instance/authApi.ts";
import { UserInfo } from "../../../data/user.ts";
import OutContainer from "../../Book/OutContainer.tsx";
import NotionContainer from "../../Book/Current/NotionContainer.tsx";
import TimePicker from "../TImePicker.tsx";
import ManageNotion from "./ManageNotion.tsx";
import {
  CalendarContainer,
  Divider,
  InContainer,
  Input,
  StoreButton,
} from "./DateManageStyle.tsx";
import { useAtom } from "jotai";
import { Month, MonthDataAtom } from "./monthData.ts";

const today = new Date();

const DateManage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(today);
  const [UserData, setUserData] = useState<UserInfo[] | null>(null);
  const [, setmonthData] = useAtom(MonthDataAtom);
  const [filterDate, setFilterDate] = useState<Month | null>(null);
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
      if (value && filterDate) {
        if (timeType === "startTime") {
          setFilterDate({ ...filterDate, startTime: value });
        } else if (timeType === "endTime") {
          setFilterDate({ ...filterDate, endTime: value });
        }
      }
    };
  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}${month}`;
  };
  const fetchData = async () => {
    try {
      const response = await authApi.get(
        `/admin/reservation/daily-schedule?month=${formatDate(date)}`
      );
      setmonthData(response.data);
      if (date) {
        const filteredData = response.data?.find((data: Month) => {
          const dataDate = new Date(TransDate(data.date));
          return isSameDay(dataDate, date);
        });
        setFilterDate(filteredData);
      }
    } catch (error) {
      console.log(`달 정보 에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
    try {
      const response = await authApi.get(
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
      console.log(`유저 정보 에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };
  const TransDate = (userDate: string) => {
    return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
  };

  const UnvailableMonth = (date: Date) => {
    return (
      date.getDate() < today.getDate() ||
      date.getMonth() - 1 > today.getMonth() ||
      date.getMonth() < today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };
  const handleCheck = (isActive: boolean) => {
    if (filterDate) {
      setFilterDate({ ...filterDate, isActive: !isActive });
    }
  };

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };
  const handleSubmit = async () => {
    try {
      await authApi.put(`/admin/reservation/daily-schedule`, filterDate);
      window.location.reload();
    } catch (e) {
      console.log(e);
      alert("다시 시도해 주세요");
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
                  <Input
                    type="checkbox"
                    defaultChecked={filterDate?.isActive}
                    checked={filterDate?.isActive}
                    onChange={() => handleCheck(filterDate?.isActive ?? false)}
                  />
                  <div
                    className={css`
                      white-space: nowrap;
                    `}
                  >
                    {date.getMonth() + 1}월 {date.getDate()}일
                  </div>
                  <TimePicker
                    onClick={handleClick("startTime")}
                    disabled={filterDate?.isActive}
                    startTime={filterDate?.startTime}
                  />
                  부터
                  <TimePicker
                    onClick={handleClick("endTime")}
                    disabled={filterDate?.isActive}
                    endTime={filterDate?.endTime}
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
        <StoreButton onClick={handleSubmit}>저장하기</StoreButton>
      </OutContainer>
    </>
  );
};
export default DateManage;
