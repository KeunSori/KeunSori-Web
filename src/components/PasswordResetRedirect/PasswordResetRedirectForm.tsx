import { passwordUpdate } from "@/api/auth";
import { useState } from "react";
import styled from "@emotion/styled";
import Input from "@/components/Input";
import Button from "@/styles/Button";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useCapsLock } from "@/utils/useCapsLock.ts";
import Toast from "@/components/Toast";
import { AxiosError } from "axios";
import { ToastType } from "@/components/Toast";

const PasswordResetRedirectForm = () => {
  const location = useLocation();
  const key = new URLSearchParams(
    location.search
  ).get("key");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] =
    useState("");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] =
    useState<ToastType>("info");
  const { isCapsLockOn, capsLockProps } =
    useCapsLock();
  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!key) {
      alert("유효하지 않은 링크입니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await passwordUpdate(
        key,
        password
      );

      if (response.status === 200) {
        alert(
          "비밀번호를 성공적으로 변경하였습니다."
        );
        navigate("/login");
      } else {
        setMessage(
          "서버와의 통신에서 문제가 발생했습니다."
        );
      }
    } catch (err: unknown) {
      // JS 표준 에러 타입 Error 를 이용한 타입 가드
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setMessage(err.response.data.message); // 서버에서 보낸 에러 메시지
        setToastType("error");
        console.log(
          "[catch-if]",
          err.response.data.message
        );
      } else if (err instanceof Error) {
        setMessage(err.message); // JS Error 객체의 기본 메시지
        setToastType("error");
        console.log(
          "[catch-else if]",
          err.message
        );
      } else {
        setMessage(
          "알 수 없는 오류가 발생했습니다."
        );
        setToastType("error");
        console.log(
          "[catch-else]",
          "알 수 없는 오류가 발생했습니다."
        );
      }
    }
  };

  // CapsLock 알림
  // 비밀번호 확인 불일치 알림

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ContentSection>
          <ReactiveInput
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="변경할 비밀번호"
            required
            {...capsLockProps}
          />
          <ReactiveInput
            type="password"
            value={passwordConfirm}
            onChange={(e) =>
              setPasswordConfirm(e.target.value)
            }
            placeholder="비밀번호 확인"
            required
            {...capsLockProps}
          />
          <ReactiveButton type="submit">
            비밀번호 변경하기
          </ReactiveButton>
        </ContentSection>
      </form>
      {isCapsLockOn && (
        <CapsLockWarning>
          ⚠️ Caps Lock이 켜져 있습니다!
        </CapsLockWarning>
      )}
      {message && (
        <Toast
          message={message}
          type={toastType}
          onClose={() => setMessage("")}
        />
      )}
    </>
  );
};

export default PasswordResetRedirectForm;

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
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
