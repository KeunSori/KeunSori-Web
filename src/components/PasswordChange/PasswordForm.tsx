// libraries
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// shared
import { getMemberStatus } from "../../utils/memberStatus";

// this
import { changePassword } from "../../api/password";
import { checkPasswordValidity } from "../../api/password";

interface PasswordFormProps {
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setChangedMessage: Dispatch<SetStateAction<string>>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  setIsDisabled,
  setChangedMessage,
}) => {
  const nav = useNavigate();

  // 주요 변수들 - 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 새 비밀번호가 변경될 때마다 실시간 유효성 검사
    setIsDisabled(!checkPasswordValidity(newPassword));
  }, [newPassword]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 유효해지면 에러 없애기
    const password = e.target.value;
    setNewPassword(password);

    if (password.length === 0) {
      // 입력 안한 경우에는 에러 메시지 없음
      setErrorMessage("");
      return;
    }

    if (!checkPasswordValidity(password)) {
      setErrorMessage(
        "비밀번호는 특수문자, 영문자, 숫자를 포함한 8자 이상 문자열 입니다."
      );
    } else {
      // 유효해지면 에러 없애기 (초기화)
      setErrorMessage("");
    }
  };

  const memberStatus = getMemberStatus() as string;

  // 비밀번호 변경하기
  async function handlePasswordChange() {
    if (!currentPassword || !newPassword || !passwordConfirm) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword !== passwordConfirm) {
      setErrorMessage("새 비밀번호 확인 값이 다릅니다.");
      return;
    }
    try {
      await changePassword(memberStatus, {
        currentPassword,
        newPassword,
      });
      setErrorMessage("");
      setChangedMessage("변경되었습니다.");
      setTimeout(() => {
        setChangedMessage(""); // 3.5초 후 변경 확인 메시지 사라짐
        nav("/mypage"); // 변경되면 마이페이지로 돌아감
      }, 3500);
    } catch (e) {
      console.error("비밀번호 변경 오류:", e);
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          setErrorMessage(e.response.data.message);
        } else {
          alert(
            `비밀번호 변경 요청을 실패했습니다. 오류 코드: ${e.response?.status}`
          );
        }
      } else {
        console.error("예상치 못한 에러", e);
      }
    }
  }

  // 엔터치면 변경하기 버튼 클릭됨
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !setIsDisabled) {
      handlePasswordChange(); // 변경 요청
    }
  };
  return (
    <>
      <Content>
        <Flex>
          <Text>현재 비밀번호</Text>
          <PassBox
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </Flex>
        <Flex>
          <Text>새 비밀번호</Text>
          <PassBox
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            onKeyDown={handleKeyDown}
          />
        </Flex>
        <Flex>
          <Text>새 비밀번호 확인</Text>
          <PassBox
            type="password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </Flex>
        <Error>{errorMessage}</Error>
        {/* handlePasswordChange를  PasswodForm내부에서 실행*/}
        <button
          id="password-form-submit"
          style={{ display: "none" }} // 화면에 표시되지 않는다.
          onClick={handlePasswordChange}
        >
          변경하기
        </button>
      </Content>
    </>
  );
};

export default PasswordForm;

import styled from "@emotion/styled";

const Error = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #ff5757;
  display: flex;
  justify-content: center;
  min-height: 20px; // 최소 공간을 차지하도록
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Text = styled.div`
  font-size: 16px;
  min-width: 100px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flex = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PassBox = styled.input`
  min-width: 350px;
  height: 40px;
  border-radius: 15px;
  border: none;
  padding: 20px;
  font-size: 16px;
  &:focus {
    border: none;
  }
  background-color: #f1f1f1;
  position: relative;
  @media (max-width: 768px) {
    min-width: 250px;
    height: 20px;
    padding: 20px;
  }
`;
