import { useState } from "react";
import { passwordUpdateLink } from "@/api/auth";
import { AxiosError } from "axios";
import Toast from "@/components/Toast";
import { ToastType } from "@/components/Toast";
import { ContentSection, ReactiveButton, ReactiveInput } from "@/styles/Auth/SharedStyle";

const PasswordResetForm = () => {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [toastType, setToastType] =
    useState<ToastType>("info");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await passwordUpdateLink(
        studentId,
        email
      );

      console.log("[try]", response.status);

      if (response.status === 200) {
        setMessage(
          "비밀번호 초기화 링크를 이메일로 전송하였습니다."
        );
        console.log("[try-if]");
        setToastType("success");
      } else {
        setMessage(
          "알 수 없는 오류가 발생했습니다."
        );
        setToastType("error");
        console.log("[try-else]");
      }
    } catch (err: unknown) {
      console.error(err);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ContentSection>
          <ReactiveInput
            type="string"
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
            placeholder="학번"
            required
          />
          <ReactiveInput
            type="string"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="이메일 주소"
            required
          />
          <ReactiveButton type="submit">
            메일 전송하기
          </ReactiveButton>
        </ContentSection>
      </form>
      {message && (
        <Toast
          message={message}
          type={toastType}
          duration={3000}
          onClose={() => {
            setMessage("");
            setToastType("info");
          }}
        />
      )}
    </>
  );
};

export default PasswordResetForm;