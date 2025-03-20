import styled from "@emotion/styled";
import NavBar2 from "../navBar/navBar2";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { getMemberStatus } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import { changePassword, checkPasswordValidity } from "../../api/password";

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
    } catch (e: any) {
      console.error("비밀번호 변경 오류:", e);
      if (e.response.status === 400) {
        // 오류
        setErrorMessage(e.response.data.message);
      } else {
        alert(
          `비밀번호 변경 요청을 실패했습니다. 오류 코드: ${e.response.status}`
        );
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

const MessageCenter = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const PopUpMessage = styled.div`
  background-color: #fceca5;
  color: rgb(123, 123, 123);
  width: 150px;
  padding: 7px;
  font-size: 14px;
  text-align: center;
  position: absolute;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #ff5757;
  display: flex;
  justify-content: center;
  min-height: 20px; // 최소 공간을 차지하도록
`;

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 200px;
  @media (max-width: 768px) {
    padding: 0 20px;
    height: auto; // 내용에 맞게 자동 조정
    gap: 70px;
  }
`;
const Title = styled.div`
  font-size: 23px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 27px;
  }
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
const ContentBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 100%;
  min-width: 500px;
  max-width: 670px;
  @media (max-width: 768px) {
    margin-top: 70px;
    min-width: auto;
  }
`;
const ChangeButton = styled.button`
  width: 100px;
  padding: 9px;
  border-radius: 15px;
  font-size: 16px;
  &.orange {
    background-color: #ffc927;
    cursor: pointer;
  }
  &.gray {
    background-color: #d0d0d0;
    color: gray;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    padding: 10px;
  }
`;
const ButtonDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
