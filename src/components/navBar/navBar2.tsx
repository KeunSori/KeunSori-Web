import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState, useContext } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useIsMobile.tsx";
import { IoClose, IoMenu } from "react-icons/io5";
import Space from "@/styles/NavBar/Space.tsx";
import { Menu, MobileMenu } from "@/styles/NavBar/Menu.tsx";
import { AuthContext } from "@/contexts/AuthContext.tsx";

const NavBar2: React.FC = () => {
  const [isMove, setIsMove] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const { logoutUser } = useContext(AuthContext);

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
        <Link to={{ pathname: "/book", search: "?type=current" }}>
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
          <Link to={{ pathname: "/book", search: "?type=current" }}>
            <Space isActive={location.pathname === "/book"}>연습실</Space>
          </Link>
          <Link to="/mypage">
            <Space isActive={location.pathname === "/mypage"}>마이페이지</Space>
          </Link>
          <LogOutButton onClick={logoutUser}>로그아웃</LogOutButton>
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
            <Link to={{ pathname: "/book", search: "?type=current" }}>
              <Space isActive={false}>예약하기</Space>
            </Link>
            <Link to="/board">
              <Space isActive={false}>게시판</Space>
            </Link>
            <Link to="/mypage">
              <Space isActive={false}>마이페이지</Space>
            </Link>
            <Space onClick={logoutUser}>로그아웃</Space>
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
  font-size: 16px;
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
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 30px;
`;
