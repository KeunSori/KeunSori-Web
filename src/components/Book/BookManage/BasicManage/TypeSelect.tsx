import { typeAtom } from "@/store/teamData";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useState } from "react";
// 예약 유형 선택 토글

const TypeSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedVal, setSelectedVal] = useState("예약 유형");

  const [type, setType] = useAtom(typeAtom);
  const onClose = (text: "합주" | "교습") => {
    setIsOpen(false);
    setType(text);
  };
  return (
    <div>
      <div style={{ position: "relative" }}>
        <InputType onClick={() => setIsOpen(!isOpen)}>
          {type === null ? "예약 유형" : type}
        </InputType>
      </div>
      {isOpen && (
        <div style={{ position: "absolute" }}>
          <InputType onClick={() => onClose("합주")}>합주</InputType>
          <InputType onClick={() => onClose("교습")}>교습</InputType>
        </div>
      )}
    </div>
  );
};

export default TypeSelect;

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
