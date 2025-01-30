import styled from "@emotion/styled";

interface ButttonProps {
  isActive: boolean;
}

interface SlotButtonProps {
  available: boolean;
  selected: boolean;
}

const SlotButton = styled.button<SlotButtonProps>`
  flex-shrink: 0;
  width: 30px;
  height: 50px;
  border: solid 1px #f1f1f1;
  background-color: ${({ available, selected }) =>
    selected ? "#ffe187" : available ? "white" : "#DDDDDD"};
  color: ${({ available }) => (available ? "black" : "gray")};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
  font-size: 14px;

  &:hover {
    background-color: ${({ available }) => (available ? "#FFAA00" : "#DDDDDD")};
  }
`;
const Button = styled.button<ButttonProps>`
  background-color: ${({ isActive }) => (isActive ? "#ffe493" : "white")};
  color: ${({ isActive }) => (isActive ? "black" : "#7f8fa4")};
  border: ${({ isActive }) =>
    isActive ? "1.5px solid #ffe493;" : "1px solid #7f8fa4"};
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  width: 70px;

  &:hover {
    background-color: #ffe493;
    color: black;
    border: 1px solid #ffe493;
  }
  &:disabled {
    background-color: #f1f1f1;
    color: #b0b0b0;
    border: 1px solid #d1d1d1;
    cursor: not-allowed;
  }
`;

const ReservationButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #fff4d5;
  color: #7f8fa4;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 100px;
  :disabled {
    background-color: #f1f1f1;
    color: #b0b0b0;
    cursor: not-allowed;
    &:hover {
      background-color: #f1f1f1;
      color: #b0b0b0;
    }
  }
  &:hover {
    background-color: #ffe493;
    color: black;
  }
`;

export { Button, ReservationButton, SlotButton };
