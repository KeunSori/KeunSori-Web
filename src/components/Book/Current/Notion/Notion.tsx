import { css } from "@emotion/css";
import { UserInfo } from "../../../../data/user.ts";
import { useEffect, useState } from "react";
import { transInstrument } from "../../../../utils/instrumentUtils.ts";
import { transDate } from "../../../../utils/dateUtils.ts";
import { Detail, NotionItem, Title } from "./NotionStyle.tsx";

interface NotionProps {
  user: UserInfo;
}
const Notion: React.FC<NotionProps> = ({ user }) => {
  const [instrument, setInstrument] = useState<string>("");
  const TransInstrument = (session: string) => {
    setInstrument(transInstrument(session));
  };

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    TransInstrument(user.reservationSession);
    setDate(new Date(transDate(user.reservationDate)));
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
