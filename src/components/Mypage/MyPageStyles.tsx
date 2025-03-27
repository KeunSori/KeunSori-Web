import styled from "@emotion/styled";

const ReserveView = styled.div`
  width: 100%;
  width: 690px;
  background-color: #ffd65c;
  padding: 14px;
  text-align: center;
  border-radius: 20px;

  font-size: 16px;
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
  margin-top: 100px;
  width: 690px;
  min-width: 600px;
  height: 260px;
  border: 2px solid #a1a1a1;
  border-radius: 30px;
  padding: 35px;

  @media (max-width: 768px) {
    min-width: 300px;
    margin-top: 80px;
    width: 90%;
    height: auto;
    padding: 25px;
  }
`;
const Title = styled.p`
  font-size: 23px;
  font-weight: 400;
  margin: 0px;
  @media (max-width: 768px) {
    font-size: 27px;
  }
`;
const Information = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  gap: 130px;
  &.email {
    gap: 115px;
  }
  @media (max-width: 768px) {
    gap: 80px;
    &.email {
      gap: 67px;
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
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const Text = styled.div`
  font-size: 16px;
  &.gray {
    color: #838383;
  }
  &.gray-line {
    color: #838383;
    border-bottom: 1px solid #838383;
    width: 130px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 15px;
    &.gray-line {
      width: 121px;
    }
  }
`;

export {
  ReserveView,
  Container,
  InfoBox,
  Title,
  Information,
  Flex,
  FlexWrap,
  Logout,
  Text,
};
