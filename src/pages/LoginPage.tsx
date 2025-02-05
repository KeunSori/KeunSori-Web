import { css } from "@emotion/css";
import logo from "/image/logo.svg";
import { Link } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm.tsx";

const LoginPage = () => {
  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100vh;
          min-height: 100vh;
          margin-top: -10vh;
        `}
      >
        <Link to="/login">
          <img
            className={css`
              margin-top: 60px;
              margin-bottom: 10px;
              width: 210px;
              max-width: 90%;
              @media (max-width: 768px) {
                width: 150px;
                margin-top: 40px;
              }
            `}
            src={logo}
            alt="logo"
          />
        </Link>
        <LoginForm />

        <Link to="/signup">
          <div
            className={css`
            font-size: 16px;
            margin-top: 13px;
            color: #808080;
            cursor: pointer;
            &:hover{
              color:black;}
              }
          `}
          >
            회원가입 하러가기
          </div>
        </Link>
      </div>
    </>
  );
};
export default LoginPage;
