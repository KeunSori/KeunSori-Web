import { css } from "@emotion/css";
import logo from "/logo.svg";
import { Link, useNavigate } from "react-router-dom";
//import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import LoginForm from "../components/Login/LoginForm.tsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/user");
  };
  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <Link to="/">
          <img
            className={css`
              margin-top: 60px;
              margin-bottom: 10px;
              width: 210px;
            `}
            src={logo}
            alt="logo"
          />
        </Link>
        <LoginForm />
        <Button onClick={onClick}>go to /user</Button>
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
