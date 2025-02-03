import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance.ts";

interface MyNotionProps {
  user: UserInfo;
}
const MyNotion: React.FC<MyNotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");
  const checkDate = () => {
    const now = new Date();

    const date = new Date(TransDate(user.reservationDate));
    if (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate()
    ) {
      return false;
    }
    if (now > date) {
      return true;
    }
    return false;
  };
  const TransDate = (userDate: string) => {
    console.log(user);
    return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
  };
  const TransInstrument = (session: string) => {
    if (session == "vocal") {
      setInstrument("보컬");
    } else if (session == "guitar") {
      setInstrument("기타");
    } else if (session == "bass") {
      setInstrument("베이스");
    } else if (session == "keyboard") {
      setInstrument("키보드");
    } else if (session == "drum") {
      setInstrument("드럼");
    } else {
      setInstrument("합주");
    }
  };
  const [date, setDate] = useState<Date | null>(null);

  const handleDelete = async () => {
    await axiosInstance.delete(`/reservation/${user.reservationId}`);
    window.location.reload();
  };
  useEffect(() => {
    TransInstrument(user.reservationSession);
    setDate(new Date(TransDate(user.reservationDate)));
  }, []);
  return (
    <>
      <Notion>
        {user.reservationMemberName}
        <Title>악기</Title>
        <Detail>{instrument}</Detail>
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            padding-right: 30px;
            gap: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f1f1f1;
          `}
        >
          <div>
            <Title>날짜</Title>
            <Detail>{`${
              date
                ? `${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일`
                : "날짜 정보 없음"
            }`}</Detail>
          </div>
          <div>
            <Title>시간</Title>
            <Detail>
              {user.reservationStartTime} - {user.reservationEndTime}
            </Detail>
          </div>
        </div>
        <div
          className={css`
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            className={css`
              font-weight: 700;
              color: #68ae82;
            `}
          >
            예약 완료
          </div>
          {!checkDate() && (
            <button
              className={css`
                font-weight: 700;
                color: #bbc5d5;
                background-color: white;
                cursor: pointer;
                &:hover {
                  color: black;
                }
              `}
              onClick={handleDelete}
            >
              예약 취소
            </button>
          )}
        </div>
      </Notion>
    </>
  );
};
export default MyNotion;
const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  margin-top: 5px;
`;
const Notion = styled.div`
  width: 250px;
  max-width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(218, 218, 218);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-size: 15px;
  font-weight: 700;
`;
