import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "/image/logo.svg";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useIsMobile.tsx";
import { IoClose, IoMenu } from "react-icons/io5";
import Space from "@/styles/NavBar/Space.tsx";
import { Menu, MobileMenu } from "@/styles/NavBar/Menu.tsx";
import logowhite from "/image/logowhite.svg";

const NavBar: React.FC = () => {
  const [isMove, setIsMove] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsMove(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Menu isMove={isMove} isHome={location.pathname === "/"}>
      <div
        className={css`
          margin: auto;
          @media (max-width: 768px) {
            margin-left: 30px;
          }
        `}
        style={{ cursor: "pointer" }}
      >
        <Link to="/">
          {!isMove && location.pathname === "/" ? (
            <img
              className={css`
                width: 80px;
              `}
              src={logowhite}
              alt="logo"
            />
          ) : (
            <img
              className={css`
                width: 80px;
              `}
              src={logo}
              alt="logo"
            />
          )}
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
          <Link to="/recruit">
            <Space isActive={location.pathname === "/recruit"}>지원하기</Space>
          </Link>
          <Link to="/contact">
            <Space isActive={location.pathname === "/contact"}>문의하기</Space>
          </Link>
          <Link to="/login">
            <Space isActive={location.pathname === "/login"}>my keun</Space>
          </Link>
        </div>
      ) : (
        <>
          {isMove && (
            <>
              <Button onClick={() => setIsOpen(!isOpen)}>
                {!isOpen ? (
                  <IoMenu size="30" stroke="#919191" />
                ) : (
                  <IoClose size="30" fill="#919191" />
                )}
              </Button>
            </>
          )}
          <MobileMenu isOpened={isOpen} isSmall={true}>
            <Link to="/recruit">
              <Space isActive={false}>지원하기</Space>
            </Link>
            <Link to="/contact">
              <Space isActive={false}>문의하기</Space>
            </Link>
            <Link to="/login">
              <Space isActive={false}>my keun</Space>
            </Link>
          </MobileMenu>
        </>
      )}
    </Menu>
  );
};

export default NavBar;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
`;
