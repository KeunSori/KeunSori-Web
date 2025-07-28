import { SelectedButton } from "@/styles/DropBoxStyle";
import styled from "@emotion/styled";
import TypeSelect from "./TypeSelect";

const AddInputs = () => {
  return (
    <Container>
      <TypeSelect />
      <InputName placeholder="팀명 입력" />
      <InputName placeholder="팀장 학번" />
      <TimeContainer>
        <SelectedButton>10:00</SelectedButton>
        <div>~</div>
        <SelectedButton>23:00</SelectedButton>
      </TimeContainer>
    </Container>
  );
};

export default AddInputs;

const Container = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 5px;
  border-radius: 10px;
  z-index: 10;
`;

const InputName = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 130px;
  height: 30px;
  margin-left: 10px;
  padding-left: 7px;
`;

const TimeContainer = styled.div`
  margin-left: 20px;
  display: flex;
  height: 100%;
  gap: 10px;
  align-items: center;
`;
