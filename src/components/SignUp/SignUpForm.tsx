import { useState } from "react";
import { registerUser } from "../../api/register.ts";
import { css } from "@emotion/css";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    hongikgmail: "",
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
      formData.hongikgmail += "@g.hongik.ac.kr";
      const response = await registerUser(formData);
      console.log("응답: ", response);
      setMessage(response.message);

      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error: ", error.message);
        console.error("Server message: ", error.response?.data.message);

        setMessage(error.response?.data.message || "다시 시도해주세요.");
      } else {
        console.error("Unexpected error: ", error);
        setMessage("Unexpected error occured.");
      }
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
          <div
            className={css`
              display: flex;
              align-items: center;
              width: 410px;
            `}
          >
            <Input
              name="hongikgmail"
              placeholder="홍익대학교 gmail"
              type="string"
              value={formData.hongikgmail}
              onChange={handleChange}
              required
              className={css`
                width: 100%;
                border-right: none;
              `}
            ></Input>
            <span
              className={css`
                padding: 10px;
                font-size: 16px;
                margin-right: 5px;
                padding-left: 0px;
              `}
            >
              @g.hongik.ac.kr
            </span>
          </div>

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

export default SignUpForm;
