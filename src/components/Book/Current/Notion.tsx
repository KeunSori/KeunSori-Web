import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { UserInfo } from "../../../data/user.ts";
import { useEffect, useState } from "react";

interface NotionProps {
  user: UserInfo;
}
const Notion: React.FC<NotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");
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
  const TransDate = (userDate: string) => {
    return `${userDate[0].toString()}/${userDate[1].toString()}/${userDate[2].toString()}`;
  };
  useEffect(() => {
    TransInstrument(user.reservationSession);
    setDate(new Date(TransDate(user.reservationDate)));
  }, []);
  return (
    <>
      <NotionItem>
        {user.reservationMemberName}
        <Title>악기</Title>
        <Detail>{instrument}</Detail>
        <div
          className={css`
            display: flex;
            justify-content: space-between;
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
      </NotionItem>
    </>
  );
};
export default Notion;

const Title = styled.div`
  font-size: 11px;
  font-weight: 300;
  margin-top: 15px;
  color: #7f8fa4;
`;
const Detail = styled.div`
  font-size: 14px;
  font-weight: 300;
  margin-top: 5px;
`;

const NotionItem = styled.div`
  @media (max-width: 768px) {
    width: 280px;
  }
  padding: 20px 30px;
  width: 320px;
  max-width: 100%;
  height:100%
  min-height: 150px;
  border-radius: 10px;
  border: 1px solid rgb(218, 218, 218);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 15px px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 20px;
`;
