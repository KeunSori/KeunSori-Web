// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// shared
import { getMemberStatus } from "../utils/jwt";
import Footer from "../styles/Footer";
import NavBar2 from "../components/navBar/navBar2";

// this
import { changePassword, checkPasswordValidity } from "../api/password";
import {
  MessageCenter,
  PopUpMessage,
  Error,
  Container,
  Title,
  Content,
  Text,
  Flex,
  PassBox,
  ContentBox,
  ChangeButton,
  ButtonDiv,
} from "../components/PasswordChange/PasswordChangeStyles";

const PasswordChange = () => {
  const nav = useNavigate();

  // 주요 변수들 - 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState("");
  // '변경하기' 버튼 비활성화 여부
  const [isDisabled, setIsDisabled] = useState(true);
  // '변경되었습니다' 팝업 나타났다가 사라지게 하기
  const [changedMessage, setChangedMessage] = useState("");

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
    if (e.key === "Enter" && !isDisabled) {
      handlePasswordChange(); // 변경 요청
    }
  };

  return (
    <>
      <NavBar2 />
      <Container>
        <ContentBox>
          <MessageCenter>
            {changedMessage && <PopUpMessage>{changedMessage}</PopUpMessage>}
          </MessageCenter>
          <Title>비밀번호 변경</Title>
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
          </Content>
          <ButtonDiv>
            <ChangeButton
              className={isDisabled ? "gray" : "orange"}
              onClick={handlePasswordChange}
              disabled={isDisabled}
            >
              변경하기
            </ChangeButton>
          </ButtonDiv>
        </ContentBox>
      </Container>
      <Footer />
    </>
  );
};
export default PasswordChange;
