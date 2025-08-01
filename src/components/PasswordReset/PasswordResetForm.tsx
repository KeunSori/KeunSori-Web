import authApi from "../../api/Instance/authApi";
import { useState } from "react";
import styled from "@emotion/styled";
import Input from "../Input";
import Button from "../../styles/Button";
// import { showToast } from "../Toast.tsx";

const PasswordResetForm = () => {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authApi.post("/auth/password/update-link/send", {
        studentId,
        email,
      });

      console.log(response);

      if (response.status === 200) {
        setMessage("비밀번호 초기화 링크를 이메일로 전송하였습니다.");
        // showToast(message, 10000);
      } else {
        throw Error("서버와의 통신에서 문제가 발생했습니다.");
      }

      console.log(message);
    } catch (err) {
        console.error(err);

      // JS 표준 에러 타입 Error 를 이용한 타입 가드
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("알 수 없는 오류가 발생했습니다.");
      }

    //   showToast(message, 10000);
      console.log(message);
    }
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
            type="string"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
          ></ReactiveInput>
          <ReactiveButton type="submit">비밀번호 찾기</ReactiveButton>
        </ContentSection>
      </form>
    </>
  );
};

export default PasswordResetForm;

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