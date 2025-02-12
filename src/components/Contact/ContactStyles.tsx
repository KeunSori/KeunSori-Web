import styled from "@emotion/styled";

export const Ground = styled.div`
  background-color: #fffbf3;
  display: flex;
  flex-direction: column;
`;

export const FAQWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  margin-top: 60px;
`;

export const Title = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 28px;
`;

export const Tabs = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  cursor: pointer;
  background: none;
  padding-bottom: 5px;
  margin: 0 10px 0 10px;
  font-size: 20px;
  border-bottom: ${(props) => (props.active ? "2px solid black" : "none")};
  color: ${(props) => (props.active ? "#505050" : "#C7C7C7")};
`;

export const FAQItem = styled.div`
  margin-top: 40px;
  width: 80%;
  text-align: center;
  font-size: 20px;
`;

export const Question = styled.div`
  border: 1px solid #505050;
  border-radius: 20px;
  height: 72px;
  cursor: default;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Answer = styled.div`
  margin: 10px 0 0;
  border: 1px solid #c7c7c7;
  border-radius: 20px;
  height: 72px;
  cursor: default;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.footer`
  text-align: center;
`;
