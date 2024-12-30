import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";

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

const Space = styled.div`
  box-sizing: border-box;
  border: none;
  &:hover {
    color: #ffaa00;
    border-bottom: 3px solid #ffaa00;
  }
  font-weight: 400;
  font-size: 16px;
  padding: 5px 0px;
  width: auto;
`;

const NavBar: React.FC = () => {
  const [isMove, setIsMove] = useState(false);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsMove(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Menu isMove={isMove}>
        <div
          className={css`
            margin: auto;
          `}
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          <img
            className={css`
              width: 90px;
            `}
            src={logo}
            alt="logo"
          />
        </div>
        <div
          className={css`
            display: flex;
            gap: 25px;
            margin: auto;
          `}
        >
          <Space>지원하기</Space>

          <Space>문의하기</Space>

          <Space>my keun</Space>
        </div>
      </Menu>
    </>
  );
};

export default NavBar;
