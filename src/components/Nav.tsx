import styled from "@emotion/styled";

interface NavProps {
  isActive: boolean;
}
const Nav = styled.button<NavProps>`
  font-size: 20px;
  font-family: S-CoreDream, sans-serif;
  min-width: 80px;
  font-weight: 300;
  font-size: 15px;
  @media (max-width: 768px) {
    min-width: 40px;
    font-size: 13px;
  }
  background-color: ${({ isActive }) => (isActive ? "#FFF4D5" : "transparent")};
  white-space: nowrap;
  border-radius: 10px;
  padding: 10px;
  color: black;
  &:hover,
  &:active {
    background-color: #fff4d5;
  }
`;
export default Nav;
