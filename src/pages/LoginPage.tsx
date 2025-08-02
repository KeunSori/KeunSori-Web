// external
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// internal
import logo from "/image/logo.svg";
import LoginForm from "@/components/LoginPage/LoginForm.tsx";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>큰소리 – 홍익대 컴퓨터공학과 밴드학회(컴공)</title>
        <meta
          name="description"
          content="홍익대학교 컴퓨터공학과 밴드학회 '큰소리'는 음악을 사랑하는 컴공인을 위한 밴드 동아리입니다."
        />
        <meta
          name="description"
          content="큰소리 밴드학회 회원 로그인 페이지입니다. 로그인하고 밴드 예약 및 활동 정보를 확인하세요!"
        />
        <meta property="og:title" content="로그인 – 큰소리 밴드학회" />
        <meta
          property="og:description"
          content="큰소리 밴드학회 회원 전용 로그인 페이지입니다."
        />
        <meta
          property="og:image"
          content="https://keunsori.com/image/logo.svg"
        />
        <meta property="og:url" content="https://keunsori.com/login" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Main>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
        <LoginForm />

        <Link to="/signup">
          <SignUpText>회원가입 하러가기</SignUpText>
        </Link>
        <Link to="/password-reset">
          <SignUpText>비밀번호를 잊으셨나요? {'->'}</SignUpText>
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
