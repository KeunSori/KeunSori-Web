import { css } from "@emotion/css";
import NavBar2 from "../components/navBar/navBar2.tsx";
import styled from "@emotion/styled";
import CurrentBook from "../components/Book/CurrentBook.tsx";
import { useState } from "react";
import ApplicationBook from "../components/Book/Application/ApplicationBook.tsx";
import MyBook from "../components/Book/MyBook.tsx";
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
const BookPage = () => {
  const [current, setCurrent] = useState(true);
  const [application, setApplication] = useState(false);
  const [my, setMy] = useState(false);

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.dataset.action === "current") {
      setCurrent(true);
      setApplication(false);
      setMy(false);
    } else if (e.currentTarget.dataset.action === "application") {
      setCurrent(false);
      setApplication(true);
      setMy(false);
    } else {
      setCurrent(false);
      setApplication(false);
      setMy(true);
    }
  }

  return (
    <>
      <NavBar2 />
      <div className={containerStyle}>
        <div
          className={css`
            width: 60%;
          `}
        >
          <div className={innerContainerStyle}>
            <Nav onClick={onClick} data-action="current" isActive={current}>
              예약 현황
            </Nav>
            <Nav
              onClick={onClick}
              data-action="application"
              isActive={application}
            >
              예약 신청
            </Nav>
            <Nav onClick={onClick} data-action="my" isActive={my}>
              나의 예약
            </Nav>
          </div>
          {current && <CurrentBook />}
          {application && <ApplicationBook />}
          {my && <MyBook />}
        </div>
      </div>
    </>
  );
};
export default BookPage;
