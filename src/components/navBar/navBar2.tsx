import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { Link, useLocation } from "react-router-dom";

const Menu = styled.div<MenuProps>`
  position: fixed;
  z-index: 3;
  width: calc(100%);
  height: 65px;
  background-color: white;
  box-sizing: border-box;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isMove }) =>
    isMove ? `border-bottom:1px solid #E6E8EA` : `box-shadow:none`}
`;
type MenuProps = {
  isMove: boolean;
};

const Space = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  color: ${({ isActive }) => (isActive ? "#ffaa00" : "inherit")};
  border-bottom: ${({ isActive }) => (isActive ? "3px solid #ffaa00" : "none")};
  &:hover {
    color: #ffaa00;
    border-bottom: 3px solid #ffaa00;
  }
  font-weight: 400;
  font-size: 18px;
  padding: 5px;
  width: auto;
`;

const NavBar2: React.FC = () => {
  const [isMove, setIsMove] = useState(false);
  const location = useLocation();

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
        `}
        style={{ cursor: "pointer" }}
      >
        <Link to="/">
          <img
            className={css`
              width: 60px;
            `}
            src={logo}
            alt="logo"
          />
        </Link>
      </div>

      <div
        className={css`
          display: flex;
          gap: 25px;
          margin: auto;
        `}
      >
        <Link to="/recruit">
          <Space isActive={location.pathname === "/book"}>예약하기</Space>
        </Link>
        <Link to="/contact">
          <Space isActive={location.pathname === "/contact"}>게시판</Space>
        </Link>
        <Link to="/login">
          <Space isActive={location.pathname === "/login"}>마이페이지</Space>
        </Link>
      </div>
    </Menu>
  );
};

export default NavBar2;
