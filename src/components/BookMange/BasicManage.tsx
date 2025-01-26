import styled from "@emotion/styled";
import TimePicker from "./TImePicker";
import { css } from "@emotion/css";

const BasicManage: React.FC = () => {
  return (
    <>
      <Container>
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <Input type="checkbox" />
          <span>월요일</span>
          <TimePicker />
          부터
          <TimePicker />
          까지
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <Input type="checkbox" />
          <span>화요일</span>
          <TimePicker />
          부터
          <TimePicker />
          까지
        </div>
      </Container>
    </>
  );
};
export default BasicManage;
const Input = styled.input`
  width: 13px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
