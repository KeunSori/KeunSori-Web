import { useState } from "react";
import { registerUser } from "../../api/register.ts";
import { css } from "@emotion/css";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    password: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log("응답: ", response);
      setMessage(response);

      navigate("/login");
    } catch (error) {
      setMessage("Sign up failed. Try again please.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1px;
          `}
        >
          <Input
            name="name"
            placeholder="이름"
            type="string"
            value={formData.name}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="studentId"
            placeholder="학번"
            type="string"
            value={formData.studentId}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="password"
            placeholder="비밀번호"
            type="string"
            value={formData.password}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="string"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          ></Input>
          <div
            className={css`
              height: 2px;
            `}
          ></div>
          <Button type="submit">큰소리 회원가입</Button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;
