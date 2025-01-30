import styled from "@emotion/styled";

interface ButttonProps {
  isActive: boolean;
}
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

export default Button;
