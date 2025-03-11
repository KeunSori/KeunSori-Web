import styled from "@emotion/styled";
import { useState } from "react";
import { getMemberStatus } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../navBar/navBar2";
import Footer from "../Footer";
import { changePassword } from "../../api/password";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // 에러 메시지 말풍선
  const [curPassError, setCurPassError] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [passConfirmError, setPassConfirmError] = useState("");
  const nav = useNavigate();

  const checkShort = newPassword.length > 0 && newPassword.length < 8; // 글자수 확인

  const memberStatus = getMemberStatus() as string;

  async function handlePasswordChange() {
    if (!currentPassword || !newPassword || !passwordConfirm) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    try {
      await changePassword(memberStatus, {
        currentPassword,
        newPassword,
        passwordConfirm,
      });
      alert("비밀번호가 변경되었습니다.");
      nav("/mypage");
    } catch (e: any) {
      console.error("비밀번호 변경 오류:", e);
      if (e.response) {
        if (e.response.status === 401) {
          setCurPassError(e.response.data.message);
        } else if (e.response.status === 400) {
          setPassConfirmError(e.response.data.message);
        } else {
          alert(
            `비밀번호 변경 요청을 실패했습니다. 오류 코드: ${e.response.status}`
          );
        }
      } else if (e instanceof Error) {
        alert(`오류 발생: ${e.message}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  console.log("currentPassword:", currentPassword);
  console.log("newPassword:", newPassword);
  console.log("passwordConfirm:", passwordConfirm);

  return (
    <>
      <NavBar2 />
      <Container>
        <ContentBox>
          <Title>비밀번호 변경</Title>
          <Content>
            <Flex>
              <Text>현재 비밀번호</Text>
              <PassBox
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {curPassError && <ErrorMes>{curPassError}</ErrorMes>}
            </Flex>
            <Flex>
              <Text>새 비밀번호</Text>
              <PassBox
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setNewPassError(""); // 에러 메시지 없애기
                }}
              />
              {checkShort && (
                <ErrorMes>비밀번호는 8자리 이상 입력하셔야 합니다.</ErrorMes>
              )}
              {newPassError && <ErrorMes>{newPassError}</ErrorMes>}
            </Flex>
            <Flex>
              <Text>새 비밀번호 확인</Text>
              <PassBox
                type="password"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setPassConfirmError("");
                }}
              />
              {passConfirmError && <ErrorMes>{passConfirmError}</ErrorMes>}
            </Flex>
          </Content>
          <ButtonDiv>
            <ChangeButton onClick={handlePasswordChange}>변경하기</ChangeButton>
          </ButtonDiv>
        </ContentBox>
      </Container>
      <Footer />
    </>
  );
};
export default PasswordChange;

const ErrorMes = styled.div`
  background-color: #fff;
  border: solid 1px #ff5757;
  color: #ff5757;
  padding: 10px;
  font-size: 20px;
  z-index: 100;

  position: absolute;
  top: 100%;
  left: 600px;
  max-width: 400px;
  min-width: 200px;

  // 말풍선 화살표
  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-color: transparent transparent #ff5757 transparent;
    top: -13px;
    left: 16px;
    border-width: 10px;
  }
  @media (max-width: 768px) {
    padding: 7px;
    font-size: 12px;
    max-width: 200px;
    min-width: 170px;
    left: 50%;
  }
  &::after {
    border-width: 7px;
  }
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
  font-size: 40px;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 27px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;
const Text = styled.div`
  font-size: 24px;
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
  min-width: 588px;
  height: 64px;
  border-radius: 15px;
  border: none;
  padding: 20px;
  font-size: 24px;
  &:focus {
    border: none;
  }
  background-color: #f1f1f1;
  position: relative;
  @media (max-width: 768px) {
    min-width: 200px;
    height: 20px;
    padding: 20px;
  }
`;
const ContentBox = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 100%;
  min-width: 870px;
  max-width: 1100px;
  @media (max-width: 768px) {
    margin-top: 70px;
    min-width: auto;
  }
`;
const ChangeButton = styled.button`
  width: 150px;
  padding: 15px;
  border-radius: 15px;
  font-size: 24px;
  background-color: #ffc927;
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    padding: 10px;
  }
`;
const ButtonDiv = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
