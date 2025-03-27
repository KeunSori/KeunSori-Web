import styled from "@emotion/styled";

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
export {
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
};
