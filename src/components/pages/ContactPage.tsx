//import { css } from "@emotion/css";
import NavBar from "../navBar/navBar.tsx";
import Footer from "../Footer.tsx";
import { useState } from "react";

import {
  Ground,
  FAQWrapper,
  Title,
  Tabs,
  TabButton,
  FAQItem,
  Question,
  Answer,
} from "../Contact/ContactStyles.tsx";

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("동아리 활동");

  return (
    <Ground>
      <NavBar />
      <FAQWrapper>
        <Title>자주 묻는 질문</Title>

        <Tabs>
          {Object.keys(faqData).map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </Tabs>

        {faqData[activeTab].map((item, index) => (
          <FAQItem key={index}>
            <Question>Q. {item.question}</Question>
            <Answer>A. {item.answer}</Answer>
          </FAQItem>
        ))}
      </FAQWrapper>
      <Footer />
    </Ground>
  );
};

const faqData: Record<string, { question: string; answer: string }[]> = {
  "동아리 활동": [
    {
      question: "큰소리는 뭐하는 동아리인가요?",
      answer:
        "큰소리는 음악을 좋아하는 사람들이 모여 밴드 연주를 하는 동아리입니다!",
    },
    {
      question: "학회 활동은 합주, 연습으로만 이루어지나요?",
      answer: "아니요! 합주 외에도 MT, 버스킹, 공연 등 다양한 활동이 있어요!",
    },
  ],
  "악기 & 공연": [
    {
      question: "다른 학회 소속인데 가입할 수 있나요?",
      answer: "네! 다른 학회 소속이어도 충분히 활동이 가능합니다!",
    },
    {
      question: "밴드부 합주나 공연이 공부에 지장을 줄까요?",
      answer: "아니요, 오히려 즐기면서 학업과 밸런스를 맞출 수 있어요!",
    },
  ],
};

export default ContactPage;
