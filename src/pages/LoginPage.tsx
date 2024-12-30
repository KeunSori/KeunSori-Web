import { css } from "@emotion/css";
import logo from "../../public/logo.svg";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import React from "react";

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
        <div
          className={css`
            font-size: 16px;
            margin-top: 13px;
            color: #808080;
            &:hover{
              color:black;}
              }
          `}
        >
          회원가입 하러가기
        </div>
      </div>
    </>
  );
};
export default LoginPage;
