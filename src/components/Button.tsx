import styled from "@emotion/styled";

const Button = styled.button`
  width: 400px;
  height: 60px;
  border: none;
  margin: 10px;
  font-size: 18px;
  color: black;
  padding: 15px;
  text-align: center;
  border-radius: 30px;
  background-color: #ffc927;
  &:hover,
  &:active {
    background-color: #ffe187;
    color: white;
  }
`;

export default Button;
