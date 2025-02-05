import { useState } from "react";
import TimePicker from "../TImePicker";
import styled from "@emotion/styled";
interface DayNotionProps {
  date: {
    dayOfWeekNum: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  };
}
const DayNotion: React.FC<DayNotionProps> = ({ date }) => {
  const [isActive, setIsActive] = useState<boolean>(date.isActive);
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const handleCheck = (isActive: boolean) => {
    setIsActive(!isActive);
  };

  return (
    <>
      <Input
        type="checkbox"
        defaultChecked={isActive}
        onChange={() => handleCheck(isActive)}
      />
      <DayContainer isActive={isActive}>
        <span>{days[date.dayOfWeekNum]}</span>
        <TimePicker disabled={isActive} startTime={date.startTime} />
        부터
        <TimePicker disabled={isActive} endTime={date.endTime} />
        까지
      </DayContainer>
    </>
  );
};

export default DayNotion;

const Input = styled.input`
  width: 13px;
`;
const DayContainer = styled.div<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? "black" : "#c4c4c4")};
  cursor: ${(props) => (props.isActive ? "null" : "not-allowed")};
  display: flex;
  align-items: center;
  gap: 10px;
`;
