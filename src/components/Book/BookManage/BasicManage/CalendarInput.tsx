import styled from "@emotion/styled";
import CalendarImg from "../../../../../public/image/calendar-keun.svg";

const CalendarInput = () => {
  return (
    <Container>
      <div>해당 시간표 적용 기간</div>
      <Flex>
        <div>2025-07-22</div>
        <div>~</div>
        <div>2025-07-22</div>
      </Flex>
      <CalendarIcon src={CalendarImg} />
    </Container>
  );
};

export default CalendarInput;

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 5px 0 15px 0;
  align-items: center;
`;
const Flex = styled.div`
  margin-left: 25px;
  display: flex;
  gap: 7px;
`;
const CalendarIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  &:hover {
    background-color: #dedede;
  }
`;
