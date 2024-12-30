import { css } from "@emotion/css";
import logo from "../../public/logo.svg";
import { Link } from "react-router-dom";
import React from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";

const LoginPage = () => {
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
        <Input placeholder="학번"></Input>
        <Input placeholder="비밀번호"></Input>
        <Button>로그인</Button>
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
