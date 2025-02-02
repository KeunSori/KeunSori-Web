import styled from "@emotion/styled";

const Space = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  font-family: SejongGeulggot;
  display: flex;
  align-items: center;
  height: 110%;
  border: none;
  color: ${({ isActive }) => (isActive ? "#ffaa00" : "inherit")};
  border-bottom: ${({ isActive }) => (isActive ? "1px solid #ffaa00" : "none")};
  &:hover {
    color: #ffaa00;
    border-bottom: 1px solid #ffaa00;
  }
  @media (max-width: 768px) {
    padding: 10px 30px;
    margin-top: 10px;
    &:hover {
      background-color: #f1f1f1;
      border-bottom: none;
      color: black;
    }
  }
  font-weight: 300;
  font-size: 16px;
  padding: 5px;
  width: auto;
`;

export default Space;
