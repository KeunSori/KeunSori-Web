import { css } from "@emotion/css";
import NavBar2 from "../components/navBar/navBar2.tsx";
import styled from "@emotion/styled";
import CurrentBook from "../components/Book/CurrentBook.tsx";
import ApplicationBook from "../components/Book/Application/ApplicationBook.tsx";
import MyBook from "../components/Book/MyBook.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../utils/jwt.ts";
interface NavProps {
  isActive: boolean;
}
const Nav = styled.button<NavProps>`
  font-size: 17px;
  min-width: 80px;
  background-color: ${({ isActive }) => (isActive ? "#FFF4D5" : "transparent")};
  font-weight: 300;
  white-space: nowrap;
  border-radius: 10px;
  padding: 10px;

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
  gap: 15px;
  width: 100%;
  margin-bottom: 10px;
`;
const BookPage = () => {
  const locaiton = useLocation();
  const query = new URLSearchParams(locaiton.search);
  const component = query.get("type");
  const navigate = useNavigate();
  if (!getToken()) navigate("/login");
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/book?type=${e.currentTarget.dataset.action}`);
    console.log(component);
  };
  useEffect(() => {
    if (!component) {
      navigate("/book?type=current");
    }
  }, []);

  return (
    <>
      <NavBar2 />
      <div className={containerStyle}>
        <div
          className={css`
            width: 70%;
          `}
        >
          <div className={innerContainerStyle}>
            <Nav
              onClick={onClick}
              data-action="current"
              isActive={component === "current"}
            >
              예약 현황
            </Nav>
            <Nav
              onClick={onClick}
              data-action="application"
              isActive={component === "application"}
            >
              예약 신청
            </Nav>
            <Nav
              onClick={onClick}
              data-action="my"
              isActive={component === "my"}
            >
              나의 예약
            </Nav>
          </div>
          {component === "current" && <CurrentBook />}
          {component === "application" && <ApplicationBook />}
          {component === "my" && <MyBook />}
        </div>
      </div>
    </>
  );
};
export default BookPage;
