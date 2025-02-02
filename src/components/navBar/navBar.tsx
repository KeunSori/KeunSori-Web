import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState, useContext } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Menu = styled.div<MenuProps>`
  position: fixed;
  z-index: 3;
  width: calc(100%);
  height: 55px;
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
  font-weight: 300;
  font-size: 16px;
  padding: 5px;
  width: auto;
`;

const NavBar: React.FC = () => {
  const { user } = useContext(AuthContext);
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
          <Space isActive={location.pathname === "/recruit"}>지원하기</Space>
        </Link>
        <Link to="/contact">
          <Space isActive={location.pathname === "/contact"}>문의하기</Space>
        </Link>
        <Link to={user?.isLoggedIn ? "/user" : "/login"}>
          <Space isActive={location.pathname === "/login"}>my keun</Space>
        </Link>
      </div>
    </Menu>
  );
};

export default NavBar;
