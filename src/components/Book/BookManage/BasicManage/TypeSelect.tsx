import { ReservationType } from "@/store/weekData";
import styled from "@emotion/styled";
import { useState } from "react";
// 예약 유형 선택 토글

interface TypeSelectProps {
  reservationType: ReservationType;
  setReservationType: (type: ReservationType) => void;
}

const TypeSelect = ({
  reservationType,
  setReservationType,
}: TypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedVal, setSelectedVal] = useState("예약 유형");

  const onClose = (text: ReservationType) => {
    setIsOpen(false);
    setReservationType(text);
  };
  return (
    <Container>
      <div style={{ position: "relative" }}>
        <InputType onClick={() => setIsOpen(!isOpen)}>
          {reservationType === null ? "예약 유형" : reservationType}
        </InputType>
      </div>
      {isOpen && (
        <div style={{ position: "absolute" }}>
          <InputType onClick={() => onClose("합주")}>합주</InputType>
          <InputType onClick={() => onClose("교습")}>교습</InputType>
        </div>
      )}
    </Container>
  );
};

export default TypeSelect;

const Container = styled.div`
  z-index: 1;
`;

const InputType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
