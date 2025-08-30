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
  applyStartDate: string;
  applyEndDate: string;
  teamName: string;
  teamStartTime: string;
  teamEndTime: string;
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
      <UserName>{teamName}</UserName>
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
  margin-top: 10px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;

  width: 100px;
  height: 30px;

  background-color: #edda794b;
  border-radius: 5px;
  font-weight: 500;
  color: #ffaa00;

  overflow: hidden;
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
