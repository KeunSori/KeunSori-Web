import styled from "@emotion/styled";

const Container = styled.div<{ isDate?: boolean }>`
  margin-top: 10px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  flex-direction: ${(props) => (!props.isDate ? "column" : "row")};
  gap: 10px;
`;

export default Container;
