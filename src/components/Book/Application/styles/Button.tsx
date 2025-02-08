import styled from "@emotion/styled";

interface ButttonProps {
  isActive: boolean;
  isMobile?: boolean;
}

interface SlotButtonProps {
  available: boolean;
  selected: boolean;
  isMobile?: boolean;
}

const SlotButton = styled.div<SlotButtonProps>`
  display: block;
  width: 30px;
  @media (max-width: 768px) {
    min-width: 30px;
    height: 40px;
  }
  height: 50px;
  border: solid 1px #f1f1f1;
  background-color: ${({ available, selected }) =>
    selected ? "#ffe187" : available ? "white" : "#DDDDDD"};
  color: ${({ available }) => (available ? "black" : "gray")};
  cursor: ${({ available }) => (available ? "pointer" : "not-allowed")};
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
  padding: 5px 3px;
  cursor: pointer;
  width: ${({ isMobile }) => (isMobile ? "40px" : "70px")};
  font-size: ${({ isMobile }) => (isMobile ? "10px" : "14px")};
  min-width: ${({ isMobile }) => (isMobile ? "40px" : "70px")};

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

const ReservationButton = styled.button<{ isMobile?: boolean }>`
  @media (max-width: 768px) {
    width: 120px;
    background-color: #fbe59d;
    color: #505050;
  }
  width: 200px;
  height: ${({ isMobile }) => (isMobile ? "40px" : "50px")};
  background-color: #fff4d5;
  color: #7f8fa4;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: ${({ isMobile }) => (isMobile ? "20px" : "100px")};
  :disabled {
    background-color: #f0f0f0;
    color: #505050;
    cursor: not-allowed;
    &:hover {
      background-color: #f0f0f0;
      color: #505050;
    }
  }
  &:hover {
    background-color: #fbe59d;
    color: #505050;
  }
`;

export { Button, ReservationButton, SlotButton };
