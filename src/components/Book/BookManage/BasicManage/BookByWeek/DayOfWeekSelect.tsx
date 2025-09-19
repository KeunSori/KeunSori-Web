import { useState } from "react";
import { Container, InputType } from "../../../../../styles/Book/SelectStyle";

interface DayOfWeekSelectProps {
  dayOfWeekName: string;
  setDayOfWeekName: (name: string) => void;
}

const DayOfWeekSelect = ({
  dayOfWeekName,
  setDayOfWeekName,
}: DayOfWeekSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = (text: string) => {
    setIsOpen(false);
    setDayOfWeekName(text);
  };

  return (
    <Container isOpen={isOpen}>
      <div style={{ position: "relative" }}>
        <InputType
          disabledHover={dayOfWeekName === "요일 선택"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {dayOfWeekName}
        </InputType>
      </div>
      {isOpen && (
        <div style={{ position: "absolute" }}>
          <InputType onClick={() => onClose("월요일")}>월요일</InputType>
          <InputType onClick={() => onClose("화요일")}>화요일</InputType>
          <InputType onClick={() => onClose("수요일")}>수요일</InputType>
          <InputType onClick={() => onClose("목요일")}>목요일</InputType>
          <InputType onClick={() => onClose("금요일")}>금요일</InputType>
          <InputType onClick={() => onClose("토요일")}>토요일</InputType>
          <InputType onClick={() => onClose("일요일")}>일요일</InputType>
        </div>
      )}
    </Container>
  );
};

export default DayOfWeekSelect;
