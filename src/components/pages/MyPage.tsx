import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
//import Footer from "../components/Footer";
import NavBar2 from "../navBar/navBar2";
import Footer from "../Footer";

const MyPage = () => {
  const nav = useNavigate();
  const navToLogin = () => {
    return nav("/login");
  };
  const navToPassChange = () => nav("/password-change");
  const navToBook = () => nav("/book"); // 나의 예약으로 수정할 예정
  return (
    <>
      <NavBar2 />
      <Container>
        <InfoBox>
          <Title>계정관리</Title>
          <FlexWrap>
            <Information>
              <Flex>
                <Text className="gray">이름</Text>
                <Text>김유진</Text>
              </Flex>
              <Flex>
                <Text className="gray">학번</Text>
                <Text>C123456</Text>
              </Flex>
              <Flex className="email">
                <Text className="gray">이메일</Text>
                <Text>yujin123@gmail.com</Text>
              </Flex>
              <Text className="gray-line" onClick={navToPassChange}>
                비밀번호 수정하기
              </Text>
            </Information>
            <Logout onClick={navToLogin}>로그아웃</Logout>
          </FlexWrap>
        </InfoBox>
        <ReserveView onClick={navToBook}>내 예약 조회</ReserveView>
      </Container>
      <Footer />
    </>
  );
};
export default MyPage;

const ReserveView = styled.div`
  width: 100%;
  max-width: 1500px;
  min-width: 750px;
  background-color: #ffc927;
  padding: 20px;
  text-align: center;
  border-radius: 20px;

  font-size: 24px;
  cursor: pointer;
  @media (max-width: 768px) {
    min-width: 300px;
    width: 90%;
    padding: 10px;
    font-size: 16px;
  }
`;

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 200px;
  gap: 30px;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: auto; // 내용에 맞게 자동 조정
  }
`;
const InfoBox = styled.div`
  margin-top: 190px;
  width: 100%; // 부모 요소의 너비에 따라 조정되도록
  max-width: 1500px;
  min-width: 750px;
  height: 380px;
  border: 2px solid #a1a1a1;
  border-radius: 30px;

  padding: 40px;

  @media (max-width: 768px) {
    min-width: 300px;
    margin-top: 80px;
    width: 90%;
    height: auto;
    padding: 20px;
  }
`;
const Title = styled.p`
  font-size: 40px;
  font-weight: 400;
  margin: 0px;
  @media (max-width: 768px) {
    font-size: 27px;
  }
`;
const Information = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  @media (max-width: 768px) {
    margin-top: 25px;
    gap: 10px;
  }
`;
const Flex = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  gap: 200px;
  &.email {
    gap: 178px;
  }
  @media (max-width: 768px) {
    gap: 50px;
    &.email {
      gap: 35px;
    }
  }
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Logout = styled.div`
  color: #838383;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const Text = styled.div`
  font-size: 24px;
  &.gray {
    color: #838383;
  }
  &.gray-line {
    color: #838383;
    border-bottom: 1px solid #838383;
    width: 193px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    &.gray-line {
      width: 130px;
    }
  }
`;
