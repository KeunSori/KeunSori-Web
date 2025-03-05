import NavBar from "../components/navBar/navBar.tsx";
import Footer from "../components/Footer.tsx";
import { useEffect, useState } from "react";

import {
  Ground,
  FAQWrapper,
  Title,
  Tabs,
  TabButton,
  FAQItem,
  Question,
  Answer,
} from "../components/Contact/ContactStyles.tsx";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      question: "큰소리는 뭐하는 곳인가요??",
      answer:
        "저희는 1987년에 만들어진 학회예요.  큰소리는 음악을 좋아하는 사람들이 모여 함께 악기를 연주하고 노래를 부르는 밴드입니다!",
    },
    {
      question: "밴드부 합주 연습하다 보면 공부하는데 지장이 갈까요?",
      answer:
        "아니요! 일주일에 한 번씩 만나 차근차근 연습하니 걱정 안하셔도 됩니다. 그리고 선배들이 옆에서 들으면 좋은 수업들, 시간표 짜기와 같은 여러 꿀팁, 노하우 등을 전수해줄거에요. 합주와 교습은 매주 한 번씩 진행됩니다!",
    },
    {
      question: "이미 다른 학회 소속인데 지원해도 되나요?",
      answer:
        "다른 동아리 하면서 활동해도 충분히 대학 밴드 생활의 낭만을 실현할 수 있어요!",
    },
    {
      question: "학회 활동은 합주, 연습으로만 이루어지나요?",
      answer:
        "정기공연을 위한 합주, 악기 교습도 진행하지만 이외에도 학기 중 정기모임, 번개모임, MT 등 다같이 즐겁게 놀면서 친해질 기회가 많아요! 또한 악기 실력을 기르고 선배들과 친해지기 위한 멘토멘티 활동도 진행할 예정이니 기대해주세요😊😊",
    },
  ],
  "악기 & 공연": [
    {
      question: "악기가 처음이어도 괜찮은가요?",
      answer:
        "괜찮습니다! 선배들이 차근차근 가르쳐줄 거예요~  배움에 대한 열정만 있다면 충분합니다!",
    },
    {
      question: "악기를 하나만 해야 하나요?",
      answer:
        "아니요! 한 가지 악기를 정하는 게 아니라 자기가 하고 싶은 다양한 악기들을 골라 배울 수 있습니다. 실제로 공연에서 연주하는 곡마다 다른 악기를 담당하는 선배들도 많아요!",
    },
    {
      question: "어떤 음악 장르를 연주하게 되나요?",
      answer:
        "연주하고 싶은 곡이 곧 우리가 연주하게 될 곡! 원하는 곡들을 후보로 받고 투표를 통해 연주할 곡을 정해요. 다양한 장르의 음악이 모두 가능합니다",
    },
    {
      question: "개인 악기가 없어도 괜찮은가요?",
      answer:
        "네! 괜찮습니다! 저희 연습실에는 공용기타, 공용베이스, 공용 이펙터, 드럼, 키보드 등 다양한 악기가 구비되어 있어요! 개인악기가 없어도 공용악기로 합주할 수 있답니다!",
    },
  ],
};

export default ContactPage;
