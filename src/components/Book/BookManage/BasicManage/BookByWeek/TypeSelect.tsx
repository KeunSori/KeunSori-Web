import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import { ReservationSessionKor } from "@/utils/mapper/regularReservation/convertSession";
import { useState } from "react";
import { Container, InputType } from "../../../../../styles/Book/SelectStyle";
// 예약 유형 선택 토글

interface TypeSelectProps {
  reservationType: ReservationType | ReservationSessionKor;
  setReservationType: (type: ReservationType | ReservationSessionKor) => void;
}

const TypeSelect = ({
  reservationType,
  setReservationType,
}: TypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLesson, setIsOpenLesson] = useState(false);

  const onClose = (text: ReservationType | ReservationSessionKor) => {
    setIsOpen(false);
    setReservationType(text);
    setIsOpenLesson(false);
  };

  const onSelectLesson = () => {
    setIsOpenLesson(true);
  };
  return (
    <Container isOpen={isOpen}>
      <div style={{ position: "relative" }}>
        <InputType
          disabledHover={reservationType === "예약 유형"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {reservationType}
        </InputType>
      </div>
      {isOpen && (
        <div style={{ position: "absolute" }}>
          <InputType onClick={() => onClose("합주")}>합주</InputType>
          <InputType onClick={onSelectLesson}>교습</InputType>
          {isOpenLesson && (
            <div style={{ position: "absolute", top: "30px", left: "100px" }}>
              <InputType onClick={() => onClose("보컬")}>보컬</InputType>
              <InputType onClick={() => onClose("키보드")}>키보드</InputType>
              <InputType onClick={() => onClose("드럼")}>드럼</InputType>
              <InputType onClick={() => onClose("기타")}>기타</InputType>
              <InputType onClick={() => onClose("베이스")}>베이스</InputType>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default TypeSelect;

// const Container = styled.div<{ isOpen: boolean }>`
//   // 클릭된 경우만 위로 덮어써서 보이게
//   z-index: ${(props) => (props.isOpen ? 1 : "auto")};
// `;

// const InputType = styled.div<{ disabledHover?: boolean }>`
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   width: 100px;
//   height: 30px;
//   background-color: #fff;
//   border: 1px solid #ddd;
//   border-radius: 5px;

//   ${({ disabledHover }) =>
//     !disabledHover &&
//     `
//     &:hover {
//       background-color: #ececec;
//       cursor: pointer;
//     }
//   `}
// `;
