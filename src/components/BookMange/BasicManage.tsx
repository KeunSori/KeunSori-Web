import styled from "@emotion/styled";
import TimePicker from "./TImePicker";
import { css } from "@emotion/css";
import Container from "./Container";

const BasicManage: React.FC = () => {
  const days = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];
  return (
    <>
      <Container>
        {days.map((day) => (
          <div
            key={day}
            className={css`
              display: flex;
              align-items: center;
              gap: 10px;
            `}
          >
            <Input type="checkbox" checked={true} />
            <span>{day}</span>
            <TimePicker />
            부터
            <TimePicker />
            까지
          </div>
        ))}
        <SumbmitButton>저장</SumbmitButton>
      </Container>
    </>
  );
};
export default BasicManage;
const Input = styled.input`
  width: 13px;
`;
const SumbmitButton = styled.button`
  width: 100px;
  padding: 5px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffefbe;
  &:hover {
    background-color: #ffc927;
    color: white;
  }
`;
