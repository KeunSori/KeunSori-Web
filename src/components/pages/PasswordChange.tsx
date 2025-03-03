import styled from "@emotion/styled";
import { useState } from "react";
import { getMemberStatus } from "../../utils/jwt";
import axios from "axios";
import authApi from "../../api/Instance/authApi";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../navBar/navBar2";
import Footer from "../Footer";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const memberStatus = getMemberStatus();
  console.log(memberStatus);

  async function handlePasswordChange() {
    if (!currentPassword || !newPassword || !passwordConfirm) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    try {
      if (memberStatus === "일반") {
        //const requestData = { currentPassword, newPassword, passwordConfirm };
        //console.log("보내는 데이터:", requestData);
        await authApi.patch("/members/me/password", {
          currentPassword,
          newPassword,
          passwordConfirm,
        });
      } else if (memberStatus === "관리자") {
        await authApi.patch("/admin/me/password", {
          currentPassword,
          newPassword,
          passwordConfirm,
        });
      } else {
        alert("가입 승인 대기 중입니다. 다른 계정으로 다시 시도하세요.");
        return;
      }
      alert("비밀번호가 변경되었습니다.");
      nav("/mypage");
    } catch (e) {
      console.error("비밀번호 변경 오류:", e);
      if (axios.isAxiosError(e)) {
        console.log("서버 응답 데이터:", e.response?.data);
        if (e.response?.status === 401) {
          alert("현재 비밀번호가 틀렸습니다.");
          setErrorMessage(e.response.data.message);
        } else if (e.response?.status === 400) {
          setErrorMessage(e.response.data.message);
        } else {
          alert(
            `비밀번호 변경 요청을 실패했습니다. 오류 코드: ${e.response?.status}`
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
            </Flex>
            <Flex>
              <Text>새 비밀번호</Text>
              <PassBox
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Flex>
            <Flex>
              <Text>새 비밀번호 확인</Text>
              <PassBox
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Flex>
          </Content>
          <div>{errorMessage}</div>
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
