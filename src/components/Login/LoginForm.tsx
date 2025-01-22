import React, { useState, useContext } from "react";
import { css } from "@emotion/css";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../Input.tsx";
import Button from "../Button.tsx";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      await authContext.loginUser(email, password);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
