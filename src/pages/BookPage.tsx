import { css } from "@emotion/css";
import NavBar2 from "../components/navBar/navBar2.tsx";
import styled from "@emotion/styled";
import CurrentBook from "../components/Book/Current/CurrentBook.tsx";
import ApplicationBook from "../components/Book/Application/ApplicationBook.tsx";
import MyBook from "../components/Book/My/MyBook.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance.ts";
interface NavProps {
  isActive: boolean;
}
const Nav = styled.button<NavProps>`
  font-size: 17px;
  font-family: S-CoreDream, sans-serif;
  min-width: 80px;
  font-weight: 200;
  font-size: 15px;
  @media (max-width: 768px) {
    min-width: 40px;
    font-size: 15px;
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
  async function fetchData() {
    const token = localStorage.getItem("accessToken");
    try {
      await axiosInstance.get("/reservation/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExpireTime");
    }
  }
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/book?type=${e.currentTarget.dataset.action}`);
  };
  useEffect(() => {
    if (!component) {
      navigate("/book?type=current");
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [component]);

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
