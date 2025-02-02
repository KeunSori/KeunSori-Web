import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../mobile/useIsMobile";
import { IoClose, IoMenu } from "react-icons/io5";
import Space from "./Space.tsx";
import { Menu, MobileMenu } from "./Menu.tsx";

const NavBar2: React.FC = () => {
  const [isMove, setIsMove] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const LogoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpireTime");
    window.location.href = "/";
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsMove(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Menu isMove={isMove}>
      <div
        className={css`
          margin: auto;
          @media (max-width: 768px) {
            margin-left: 30px;
          }
        `}
        style={{ cursor: "pointer" }}
      >
        <Link to="/book">
          <img
            className={css`
              width: 60px;
            `}
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      {!isMobile ? (
        <div
          className={css`
            display: flex;
            gap: 25px;
            margin: auto;
          `}
        >
          <Link to="/book">
            <Space isActive={location.pathname === "/book"}>연습실</Space>
          </Link>
          <Link to="/board">
            <Space isActive={location.pathname === "/board"}>게시판</Space>
          </Link>
          <Link to="/mypage">
            <Space isActive={location.pathname === "/mypage"}>마이페이지</Space>
          </Link>
          <LogOutButton onClick={LogoutUser}>로그아웃</LogOutButton>
        </div>
      ) : (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? (
              <IoMenu size="30" stroke="#919191" />
            ) : (
              <IoClose size="30" fill="#919191" />
            )}
          </Button>
          <MobileMenu isOpened={isOpen}>
            <Link to="/book">
              <Space isActive={false}>예약하기</Space>
            </Link>
            <Link to="/board">
              <Space isActive={false}>게시판</Space>
            </Link>
            <Link to="/mypage">
              <Space isActive={false}>마이페이지</Space>
            </Link>
            <Space onClick={LogoutUser}>로그아웃</Space>
          </MobileMenu>
        </>
      )}
    </Menu>
  );
};

export default NavBar2;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
`;
const LogOutButton = styled.button`
  font-family: SejongGeulggot;
  background-color: transparent;
  border: 1.5px solid #fec511;
  &:hover {
    background-color: rgba(254, 199, 17, 0.3);
  }

  border-radius: 25px;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 30px;
`;
