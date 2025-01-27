import React, { useState, useContext } from "react";
import { css } from "@emotion/css";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authContext) {
      const success = await authContext.loginUser(studentId, password);

      if (success) {
        navigate("/user");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <Input
          type="string"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="학번"
          required
        ></Input>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        ></Input>
        <Button type="submit">로그인</Button>
      </div>
    </form>
  );
};

export default LoginForm;
