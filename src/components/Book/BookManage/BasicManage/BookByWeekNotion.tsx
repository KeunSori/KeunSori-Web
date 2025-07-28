import { SelectedButton } from "@/styles/DropBoxStyle";
import styled from "@emotion/styled";

const BookByWeekNotion = () => {
  return (
    <Container>
      <UserName>사무라이하트</UserName>
      <TimeContainer>
        <SelectedButton>16:00</SelectedButton>
        <div>~</div>
        <SelectedButton>18:00</SelectedButton>
      </TimeContainer>
      <DeleteButton>x</DeleteButton>
    </Container>
  );
};

export default BookByWeekNotion;

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
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
const DeleteButton = styled.div`
  color: #d61b1b;
  font-weight: 400;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  padding: 2px 5px;
`;
