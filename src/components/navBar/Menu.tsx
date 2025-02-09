import styled from "@emotion/styled";

interface MobileMenuProps {
  isOpened: boolean;
  isSmall?: boolean;
}
const MobileMenu = styled.div<MobileMenuProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  max-height: ${({ isOpened }) => (isOpened ? "230px" : "0px")};
  ${({ isSmall }) => (isSmall ? `height:170px` : null)};
  transition: max-height 0.3s ease-in-out;
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
const Menu = styled.div<MenuProps>`
  padding: 5px 0px;
  position: fixed;
  gap: 300px;
  @media (max-width: 768px) {
    gap: 0px;
  }
  z-index: 30;
  width: calc(100%);
  height: 60px;
  background-color: white;
  box-sizing: border-box;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isMove }) =>
    isMove ? `border-bottom:1px solid #E6E8EA` : `box-shadow:none`}
`;
interface MenuProps {
  isMove: boolean;
}

export { MobileMenu, Menu };
