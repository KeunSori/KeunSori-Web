import styled from "@emotion/styled";

const Ground = styled.div`
  background-color: #fffbf3;
  display: flex;
  flex-direction: column;
`;

const FAQWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 60px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 28px;
`;

const Tabs = styled.div`
  display: flex;
  margin-top: 40px;
`;

const TabButton = styled.button<{ active: boolean }>`
  cursor: pointer;
  background: none;
  padding-bottom: 5px;
  margin: 0 10px 0 10px;
  font-size: 20px;
  border-bottom: ${(props) => (props.active ? "2px solid black" : "none")};
  color: ${(props) => (props.active ? "#505050" : "#C7C7C7")};
`;

const FAQItem = styled.div`
  margin-top: 40px;
  width: 80%;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 32px;
  }
`;

const Question = styled.div`
  padding: 10px;
  border: 1px solid #505050;
  border-radius: 20px;
  height: 72px;
  cursor: default;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 16px;
    height: 60px;
  }
`;

const Answer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 0;
  padding: 10px;
  border: 1px solid #c7c7c7;
  border-radius: 20px;
  min-height: 72px;
  cursor: default;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 13px;
    min-height: 60px;
  }
`;

const Footer = styled.footer`
  text-align: center;
`;

export {
  Ground,
  FAQWrapper,
  Title,
  Tabs,
  TabButton,
  FAQItem,
  Question,
  Answer,
  Footer,
};
