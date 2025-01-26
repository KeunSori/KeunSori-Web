import { css } from "@emotion/css";
import NavBar3 from "../components/navBar/navBar3.tsx";
import styled from "@emotion/styled";
import { useState } from "react";

interface NavProps {
  isActive: boolean;
}
const Nav = styled.button<NavProps>`
  font-size: 17px;
  background-color: ${({ isActive }) => (isActive ? "#FFF4D5" : "transparent")};
  font-weight: 300;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  &:hover,
  &:active {
    background-color: #fff4d5;
  }
`;
const containerStyle = css`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
`;

const innerContainerStyle = css`
  display: flex;
  gap: 20px;
  width: 100%;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 20px;
`;
const BookManagePage = () => {
  const [basic, setBasic] = useState(true);
  const [date, setDate] = useState(false);

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.dataset.action === "basic") {
      setBasic(true);
      setDate(false);
    } else {
      setBasic(false);
      setDate(true);
    }
  }

  return (
    <>
      <NavBar3 />
      <div className={containerStyle}>
        <div
          className={css`
            width: 60%;
          `}
        >
          <div className={innerContainerStyle}>
            <Nav onClick={onClick} data-action="basic" isActive={basic}>
              기본 예약 관리
            </Nav>

            <Nav onClick={onClick} data-action="date" isActive={date}>
              일자별 예약 관리
            </Nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookManagePage;
