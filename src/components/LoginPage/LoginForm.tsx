import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import Input from "../Input.tsx";
import Button from "../../styles/Button.ts";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/member.ts";
import { getMemberStatus, setMemberStatus } from "@/utils/jwt.ts";

const LoginForm: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
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

    const data = await getUserInfo();
    setMemberStatus(data.status);

    const memberStatus = getMemberStatus();

    if (memberStatus === "관리자") {
      navigate("/member-management");
    } else if (memberStatus === "일반") {
      navigate("/book");
    } else {
      alert("승인 대기 중입니다. 다른 계정으로 다시 시도해주세요. 테스트 실패");
      authContext.logoutUser();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ContentSection>
          <ReactiveInput
            type="string"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번"
            required
          ></ReactiveInput>
          <ReactiveInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="비밀번호"
            required
          ></ReactiveInput>
          <ReactiveButton type="submit">로그인</ReactiveButton>
        </ContentSection>
      </form>
      {capsLockOn && (
        <CapsLockWarning>⚠️ Caps Lock이 켜져 있습니다!</CapsLockWarning>
      )}
      {message && <Message>{message}</Message>}
    </>
  );
};

export default LoginForm;

const ContentSection = styled.section`
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
`;

const ReactiveInput = styled(Input)`
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const ReactiveButton = styled(Button)`
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CapsLockWarning = styled.div`
  color: "red";
  font-size: "14px";
  margin-top: "5px";
`;

const Message = styled.p`
  text-align: center;
  color: red;
`;
