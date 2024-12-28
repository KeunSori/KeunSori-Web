import styled from "@emotion/styled";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";

const Menu = styled.div<MenuProps>`
  position: fixed;
  z-index: 3;
  width: calc(100%);
  height: 59px;
  background-color: white;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 300;
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
    background-color: #e6e6e6;
  }
  padding: 12px 10px;
  width: auto;
  border-radius: 8px;
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
          큰소리
        </div>
        <div
          className={css`
            display: flex;
            gap: 10px;
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
