import { DateString, TimeString } from "@/store/Time";
import {
  convertSessionKor,
  ReservationSessionEng,
} from "@/utils/mapper/regularReservation/convertSession";
import styled from "@emotion/styled";
import { memo, useEffect } from "react";
import TimeSelecter from "../../TimeSelecter";
import { teamWeekDataAtom } from "@/store/weekData";
import { getUpdateWeekDateWithTimeDetail } from "@/utils/weekDataTimeUtils";
import { useAtom } from "jotai";

interface BookByWeekNotionProps {
  regularReservationId: number; // 예약 고유 ID
  reservationSessionEng: ReservationSessionEng;
  applyStartDate: DateString;
  applyEndDate: DateString;
  teamName: string;
  teamStartTime: TimeString;
  teamEndTime: TimeString;
  handleDeleteItem: (reservationId: number) => void;
  dayOfWeekNum: number;
}

const BookByWeekNotion = ({
  regularReservationId,
  reservationSessionEng,
  applyStartDate,
  applyEndDate,
  teamName,
  teamStartTime,
  teamEndTime,
  handleDeleteItem,
  dayOfWeekNum,
}: BookByWeekNotionProps) => {
  const startDateWithoutYear = applyStartDate.slice(5);
  const endDateWithoutYear = applyEndDate.slice(5);

  const [teamWeekData, setTeamWeekData] = useAtom(teamWeekDataAtom);

  const handleClick =
    (timeType: "startTime" | "endTime") =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const value = e.currentTarget.getAttribute("value") as TimeString | null;
      if (value) {
        const newTeamWeekData = getUpdateWeekDateWithTimeDetail(
          teamWeekData,
          dayOfWeekNum,
          timeType,
          value,
        );
        setTeamWeekData(newTeamWeekData);
      }
    };

  useEffect(() => {
    console.log("업데이트된 팀 예약 데이터:", teamWeekData);
  }, [teamWeekData]);
  return (
    <Container>
      <Flex>
        <div>{startDateWithoutYear}</div>
        <div>~</div>
        <div>{endDateWithoutYear}</div>
      </Flex>
      <UserName title={teamName}>{teamName}</UserName>
      <SessionBox>{convertSessionKor(reservationSessionEng)}</SessionBox>
      <TimeContainer>
        <TimeSelecter
          disabled={true}
          startTime={teamStartTime}
          onClick={handleClick("startTime")}
        />
        <div>~</div>
        <TimeSelecter
          disabled={true}
          startTime={teamEndTime}
          onClick={handleClick("endTime")}
        />
      </TimeContainer>
      <DeleteButton onClick={() => handleDeleteItem(regularReservationId)}>
        x
      </DeleteButton>
    </Container>
  );
};

export default memo(BookByWeekNotion);

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 9px;
  margin-left: 15px;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  gap: 5px;
`;
const TimeContainer = styled.div`
  margin-left: 47px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const UserName = styled.div`
  margin-left: 5px;

  width: 100px;
  height: 30px;

  background-color: #edda794b;
  border-radius: 5px;
  font-weight: 500;
  color: #ffaa00;

  display: block; // 고정된 너비 갖기
  overflow: hidden;
  white-space: nowrap; // 한 줄로
  text-overflow: ellipsis; // ... 처리 !!
  padding: 7px 0 0 7px;
`;
const DeleteButton = styled.button`
  color: #d61b1b;
  font-weight: 400;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  padding: 2px 5px;
`;
const SessionBox = styled.div`
  width: 20px;
`;
