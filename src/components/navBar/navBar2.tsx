import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../mobile/useIsMobile";
import { IoClose, IoMenu } from "react-icons/io5";

const Menu = styled.div<MenuProps>`
  position: fixed;
  @media (max-width: 768px) {
    gap: 0px;
  }
  gap: 200px;
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

const Space = styled.div<{ isActive?: boolean; isMobile?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 110%;
  border: none;

  color: ${({ isActive }) => (isActive ? "#ffaa00" : "inherit")};
  border-bottom: ${({ isActive }) => (isActive ? "3px solid #ffaa00" : "none")};
  &:hover {
    color: ${({ isMobile }) => (isMobile ? "inherit" : "#ffaa00")};
    border-bottom: ${({ isMobile }) =>
      isMobile ? "none" : "3px solid #ffaa00"};
    background-color: ${({ isMobile }) => (isMobile ? "#f1f1f1" : "none")};
  }
  font-weight: 300;
  font-size: 16px;
  padding: ${({ isMobile }) => (isMobile ? "10px 30px" : "5px")};
  margin-top: ${({ isMobile }) => (isMobile ? "10px" : "0px")};
  width: auto;
`;
const NavBar2: React.FC = () => {
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
            <Space isActive={location.pathname === "/book"} isMobile={isMobile}>
              예약하기
            </Space>
          </Link>
          <Link to="/board">
            <Space
              isActive={location.pathname === "/board"}
              isMobile={isMobile}
            >
              게시판
            </Space>
          </Link>
          <Link to="/mypage">
            <Space
              isActive={location.pathname === "/mypage"}
              isMobile={isMobile}
            >
              마이페이지
            </Space>
          </Link>
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
              <Space isActive={false} isMobile={isMobile}>
                예약하기
              </Space>
            </Link>
            <Link to="/board">
              <Space isActive={false} isMobile={isMobile}>
                게시판
              </Space>
            </Link>
            <Link to="/mypage">
              <Space isActive={false} isMobile={isMobile}>
                마이페이지
              </Space>
            </Link>
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
  margin-right: 30px;
`;
interface MobileMenuProps {
  isOpened: boolean;
}
const MobileMenu = styled.div<MobileMenuProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: ${({ isOpened }) => (isOpened ? "175px" : "0px")};
  transition: height 0.3s ease-in-out;
  z-index: 1;
  gap: 5px;
  top: 55px;

  overflow: hidden;
  background-color: #fff;
  ${({ isOpened }) =>
    isOpened &&
    `
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  `}
`;
