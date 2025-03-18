import styled from "@emotion/styled";
import logo from "/image/logo.svg";
import { Link } from "react-router-dom";
import LoginForm from "../Login/LoginForm.tsx";

const LoginPage = () => {
  return (
    <>
      <Main>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
        <LoginForm />

        <Link to="/signup">
          <SignUpText>회원가입 하러가기</SignUpText>
        </Link>
      </Main>
    </>
  );
};

export default LoginPage;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  margin-top: -10vh;
`;

const Logo = styled.img`
  margin-top: 60px;
  margin-bottom: 30px;
  width: 250px;
  max-width: 90%;
  @media (max-width: 768px) {
    width: 150px;
    margin-top: 40px;
  }
`;

const SignUpText = styled.div`
  font-size: 16px;
  margin-top: 13px;
  color: #808080;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
