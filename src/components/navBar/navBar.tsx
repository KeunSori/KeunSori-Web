import { css } from "@emotion/css";
import React, { useEffect, useState, useContext } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Menu } from "./Menu.tsx";
import Space from "./Space.tsx";

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
