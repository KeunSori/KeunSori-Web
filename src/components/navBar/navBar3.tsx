import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Space from "./Space";
import { Menu } from "./Menu";
const NavBar3: React.FC = () => {
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
              width: 50px;
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
        <Link to="/bookmanage">
          <Space isActive={location.pathname === "/bookmanage"}>예약관리</Space>
        </Link>
        <Link to="/contact">
          <Space isActive={location.pathname === "/contact"}>회원관리</Space>
        </Link>
      </div>
    </Menu>
  );
};

export default NavBar3;
