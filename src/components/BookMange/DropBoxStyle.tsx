import styled from "@emotion/styled";

const Dropbox = styled.div<{ isOpened: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100px;
  max-height: ${(props) => (props.isOpened ? "200px" : "0px")};
  transition: max-height 0.3s ease-in-out;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
  top: 30px;
  background-color: #fff;
  border: ${(props) => (props.isOpened ? "1px solid #ddd" : "none")};
`;
const SelectedButton = styled.button<{ disabled?: boolean }>`
  cusur: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 100px;
  height: 30px;
  color: black;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const Button = styled.button`
  color: black;
  width: 100px;
  height: 30px;
  text-align: left;
  margin: 10px;

  background-color: #fff;
  &:hover {
    color: #ffaa00;
    font-weight: 500;
  }
`;
export { Dropbox, SelectedButton, Button };
