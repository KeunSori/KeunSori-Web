import logo from "/image/logo.svg";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUp/SignUpForm.tsx";
import styled from "@emotion/styled";

const SignUpPage = () => {
  return (
    <>
      <Ground>
        <Link to="/login">
          <Logo src={logo} alt="logo" />
        </Link>

        {/* 회원 가입 폼 */}
        <SignUpForm />

        <Notice>* 가입 승인이 될 때까지 며칠 시간이 소요될 수 있습니다.</Notice>
      </Ground>
    </>
  );
};

export default SignUpPage;

const Ground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1px;
  height: 100vh;
  min-height: 100vh;
  margin-top: -5vh;
`;

const Logo = styled.img`
  margin-top: 60px;
  margin-bottom: 10px;
  width: 210px;
  max-width: 90%;
  @media (max-width: 768px) {
    width: 150px;
    margin-top: 40px;
  }
`;

const Notice = styled.div`
  color: rgb(98, 98, 98);
`;
