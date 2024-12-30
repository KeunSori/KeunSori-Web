import styled from "@emotion/styled";

const Input = styled.input`
  width: 400px;
  height: 60px;
  border: none;
  margin: 5px;
  font-size: 18px;
  padding: 15px;
  border-radius: 20px;
  background-color: #f1f1f1;
  &::placeholder {
    color: #808080;
  }
  &:focus {
    border: 2px solid #ffc927;
    background-color: white;
  }
`;
export default Input;
