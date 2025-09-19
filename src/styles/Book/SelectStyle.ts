import styled from "@emotion/styled";
export const Container = styled.div<{ isOpen: boolean }>`
  // 클릭된 경우만 위로 덮어써서 보이게
  z-index: ${(props) => (props.isOpen ? 1 : "auto")};
  cursor: pointer;
`;

export const InputType = styled.div<{ disabledHover?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;

  ${({ disabledHover }) =>
    !disabledHover &&
    `
    &:hover {
      background-color: #ececec;
      cursor: pointer;
    }
  `}
`;

export default { Container, InputType };
