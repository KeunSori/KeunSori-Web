import { useState } from "react";
import { registerUser } from "../../api/register.ts";
import { css } from "@emotion/css";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

interface FormData {
  name: string;
  studentId: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage("회원가입에 성공했습니다.");
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Ground>
          <Slot>
            <Input
              className={css`
                width: 100%;
              `}
              name="name"
              placeholder="이름"
              type="name"
              value={formData.name}
              onChange={handleChange}
              required
            ></Input>
          </Slot>
          <Slot>
            <Input
              className={css`
                width: 100%;
              `}
              name="studentId"
              placeholder="학번"
              type="string"
              value={formData.studentId}
              onChange={handleChange}
              required
            ></Input>
          </Slot>

          <Slot>
            <Input
              name="email"
              placeholder="개인 이메일"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={css`
                width: 100%;
                border-right: none;
              `}
            ></Input>
            <CustomButton>인증번호발송</CustomButton>
          </Slot>

          <Slot>
            <CustomInput
              name="authCode"
              placeholder="인증 번호 입력"
              type="string"
              required
            ></CustomInput>
            <CustomButton>확인</CustomButton>
            <CustomButton>재전송</CustomButton>
          </Slot>

          <Slot>
            <Input
              className={css`
                width: 100%;
              `}
              name="password"
              placeholder="비밀번호"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              required
            ></Input>
          </Slot>
          <Slot>
            <Input
              className={css`
                width: 100%;
              `}
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            ></Input>
          </Slot>

          <div
            className={css`
              height: 2px;
            `}
          ></div>

          <Slot>
            <Button
              className={css`
                width: 100%;
              `}
              type="submit"
            >
              큰소리 회원가입
            </Button>
          </Slot>
        </Ground>
      </Form>
      {capsLockOn && <Notice>⚠️ Caps Lock이 켜져 있습니다!</Notice>}
      {message && <Message>{message}</Message>}
    </>
  );
};

export default SignUpForm;

const Slot = styled.div`
  display: flex;
  align-items: center;
  width: 410px;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Ground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1px;
`;

const CustomInput = styled(Input)`
  width: 150px;
`;

const CustomButton = styled(Button)`
  margin: 5px;
  font-size: 15px;
`;

const Notice = styled.div`
  color: "red";
  fontsize: "14px";
  margintop: "5px";
  marginbottom: "5px";
`;

const Message = styled.p`
  text-align: center;
  color: red;
`;
