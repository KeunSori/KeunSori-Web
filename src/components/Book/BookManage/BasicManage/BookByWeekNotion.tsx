import { SelectedButton } from "@/styles/DropBoxStyle";
import styled from "@emotion/styled";

interface BookByWeekNotionProps {
  teamName: string;
  teamStartTime: string;
  teamEndTime: string;
  handleDeleteItem: (reservationId: number) => void;
}

const BookByWeekNotion = ({
  teamName,
  teamStartTime,
  teamEndTime,
  handleDeleteItem,
}: BookByWeekNotionProps) => {
  return (
    <Container>
      <UserName>{teamName}</UserName>
      <TimeContainer>
        <SelectedButton>{teamStartTime}</SelectedButton>
        <div>~</div>
        <SelectedButton>{teamEndTime}</SelectedButton>
      </TimeContainer>
      <DeleteButton onClick={() => handleDeleteItem(0)}>x</DeleteButton>
    </Container>
  );
};

export default BookByWeekNotion;

const Container = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
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
  color: black;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

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
