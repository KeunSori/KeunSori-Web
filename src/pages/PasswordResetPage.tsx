import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import logo from "/image/logo.svg";
import PasswordResetForm from "../components/PasswordReset/PasswordResetForm";
import { Main, Logo, LinkText } from "@/styles/Auth/PageStyle";

const PasswordResetPage = () => {
  return (
    <>
      <Main>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>

        <InfoText>
          학번과 이메일을 입력하면 비밀번호를
          초기화할 수 있는 링크를 이메일로
          전송합니다.
        </InfoText>

        {/* <PasswordResetForm /> */}
        <PasswordResetForm />
        <Link to="/login">
          <LinkText>로그인 하러가기</LinkText>
        </Link>
      </Main>
    </>
  );
};

export default PasswordResetPage;

const InfoText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30rem;
  max-width: 400px;
  font-size: 16px;
  margin-bottom: 13px;
  color: #808080;
`;
