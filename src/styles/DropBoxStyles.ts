import styled from "@emotion/styled";

const ArrowButton = styled.div`
  font-size: 10px;
  color: #000;
  background-color: transparent;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  max-width: 200px;
`;
interface DropboxProps {
  isOpened: boolean;
}
const Dropbox = styled.div<DropboxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100px;
  padding-bottom: 10px;
  max-height: ${({ isOpened }) => (isOpened ? "200px" : "0px")};
  transition: max-height 0.3s ease-in-out;
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
  gap: 5px;
  top: 30px;
  background-color: #fff;

  ${({ isOpened }) =>
    isOpened &&
    `
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  `}
`;
const SelectedButton = styled.button`
  color: rgb(0, 0, 0);
  min-width: 100px;
  white-space: nowrap;
  height: 30px;
  margin-right: 5px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  width: 100%;
  height: 30px;
  text-align: left;
  padding: 8px;
  background-color: #fff;
  color: black;
  margin: 5px;
  margin-bottom: 0px;
  &:hover {
    color: #ffaa00;
    font-weight: 500;
  }
`;
export { ArrowButton, Container, Dropbox, SelectedButton, Button };
