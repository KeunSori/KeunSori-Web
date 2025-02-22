import styled from "@emotion/styled";
import NavBar2 from "../components/navBar/navBar2";
import Footer from "../components/Footer";

const PasswordChange = () => {
  return (
    <>
      <NavBar2 />
      <Container>
        <ContentBox>
          <Title>비밀번호 변경</Title>
          <Content>
            <Flex>
              <Text>현재 비밀번호</Text>
              <PassBox />
            </Flex>
            <Flex>
              <Text>새 비밀번호</Text>
              <PassBox />
            </Flex>
            <Flex>
              <Text>새 비밀번호 확인</Text>
              <PassBox />
            </Flex>
          </Content>
          <ButtonDiv>
            <ChangeButton>변경하기</ChangeButton>
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
