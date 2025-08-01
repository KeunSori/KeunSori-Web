import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import logo from "/image/logo.svg";
import PasswordResetRedirectForm from "../components/PasswordResetRedirect/PasswordResetRedirectForm";

const PasswordResetRedirectPage = () => {
    return (
        <>
        <Main>
            <Link to="/">
                <Logo src={logo} alt="logo" />
            </Link>
            
            {/* <PasswordResetForm /> */}
            <PasswordResetRedirectForm />
            <Link to="/login">
                <LinkText>로그인 하러가기</LinkText>
            </Link>
        </Main>
        </>
    );
}

export default PasswordResetRedirectPage;

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

const LinkText = styled.div`
  font-size: 16px;
  margin-top: 13px;
  color: #808080;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;