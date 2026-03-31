import { DateString, TimeString } from "@/store/Time";
import { SelectedButton } from "@/styles/DropBoxStyle";
import {
  convertSessionKor,
  ReservationSessionEng,
} from "@/utils/mapper/regularReservation/convertSession";
import styled from "@emotion/styled";
import { memo } from "react";

interface BookByWeekNotionProps {
  regularReservationId: number; // 예약 고유 ID
  reservationSessionEng: ReservationSessionEng;
  applyStartDate: DateString;
  applyEndDate: DateString;
  teamName: string;
  teamStartTime: TimeString;
  teamEndTime: TimeString;
  handleDeleteItem: (reservationId: number) => void;
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
}: BookByWeekNotionProps) => {
  const startDateWithoutYear = applyStartDate.slice(5);
  const endDateWithoutYear = applyEndDate.slice(5);

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
        <SelectedButton>{teamStartTime}</SelectedButton>
        <div>~</div>
        <SelectedButton>{teamEndTime}</SelectedButton>
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
