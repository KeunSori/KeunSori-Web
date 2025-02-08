import React, { useState, useContext } from "react";
import { css } from "@emotion/css";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import { useNavigate } from "react-router-dom";
import { getMemberStatus } from "../../utils/jwt.ts";

const LoginForm: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authContext) {
      return;
    }

    const { success, message } = await authContext.loginUser(
      studentId,
      password
    );

    if (!success) {
      setMessage(message || "로그인 실패. 다시 시도해주세요.");
      return;
    }

    const memberStatus = getMemberStatus();

    if (memberStatus === "관리자") {
      navigate("/member-management");
    } else if (memberStatus === "일반") {
      navigate("/book");
    } else {
      alert("승인 대기 중입니다. 다른 계정으로 다시 시도해주세요.");
      authContext.logoutUser();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            max-width: 400px;
            margin: auto;
            @media (max-width: 768px) {
              max-width: 90%;
            }
          `}
        >
          <Input
            className={css`
              @media (max-width: 768px) {
                max-width: 90%;
              }
            `}
            type="string"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번"
            required
          ></Input>
          <Input
            className={css`
              @media (max-width: 768px) {
                max-width: 90%;
              }
            `}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          ></Input>
          <Button
            className={css`
              @media (max-width: 768px) {
                max-width: 90%;
              }
            `}
            type="submit"
          >
            로그인
          </Button>
        </div>
      </form>
      {message && (
        <p
          className={css`
            text-align: center;
            color: red;
          `}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default LoginForm;
