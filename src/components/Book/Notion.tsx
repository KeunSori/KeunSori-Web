import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { UserInfo } from "../../data/user.ts";
import { useEffect, useState } from "react";

interface NotionProps {
  user: UserInfo;
}
const Notion: React.FC<NotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");
  const TransInstrument = (session: string) => {
    if (session == "VOCAL") {
      setInstrument("보컬");
    } else if (session == "GUITAR") {
      setInstrument("기타");
    } else if (session == "BASS") {
      setInstrument("베이스");
    } else if (session == "KEYBOARD") {
      setInstrument("키보드");
    } else if (session == "DRUM") {
      setInstrument("드럼");
    } else {
      setInstrument("합주");
    }
  };

  const [date, setDate] = useState<Date | null>(null);
  const TransDate = (userDate: string) => {
    setDate(new Date(userDate));
  };
  useEffect(() => {
    TransInstrument(user.session);
    TransDate(user.reservationDate);
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
            padding-right: 60px;
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
  width: 340px;
  max-width: 100%;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 15px 20px;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 20px;
`;
