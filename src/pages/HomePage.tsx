import NavBar from "../components/navBar/navBar.tsx";
import FolderCard from "../components/Home/FolderCard.tsx";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import logo from "/image/logo.svg";
import heart from "/image/heart.svg";
import Activity from "../components/Home/Activity.tsx";
import timeline from "/image/timeline.svg";
import Apply from "../components/Home/Apply.tsx";
import YoutubeContents from "../components/Home/YoutubeContents.tsx";
import Wrapper from "../components/Wrapper.tsx";
import Footer from "../components/Footer.tsx";
interface FolderDetailInfo {
  color: string;
  type: string;
  image: string;
  content: string;
  number: number;
}

const HomePage = () => {
  const DetailNote: FolderDetailInfo[] = [
    {
      color: "#EBE8DE",
      type: "따뜻한 분위기",
      image: "image",
      content: "따뜻하고 가족 같은 분위기로 선배들과 친구들을 사귀기 쉬워요",
      number: 1,
    },
    {
      color: "#F4E170",
      type: "좋은 장비",
      image: "image",
      content: "개인 악기가 없어도 학회에 있는 악기들로 활동 할 수 잇어요",
      number: 2,
    },
    {
      color: "#DCAB53",
      type: "다양한 장르",
      image: "image",
      content:
        "부원이 많아 음악장르가 다양해요 취향이 맞는 친구와 합주를 즐길 수 있어요",
      number: 3,
    },
  ];
  return (
    <>
      <NavBar />
      <Wrapper>
        <div
          className={css`
            margin: 50px;
          `}
        ></div>
        <ImageContainer>
          <Image src={logo} />
        </ImageContainer>
        <Intro>
          작은 소리들의 화합
          <Title>큰소리</Title>
        </Intro>
        <HeartImg src={heart} />
        <Detail>
          큰소리
          <Details>
            홍익대학교 컴퓨터공학과 밴드 학회 큰소리는
            <br />
            1999년에 만들어진 전통 있는 학회로,
            <br />
            음악을 좋아하는 사람들이 모여 함께 악기를 연주하며 노래를 부르는
            밴드 입니다
            <br />
            큰소리에서 대학 생활의 로망을 실현해봐요!
          </Details>
        </Detail>
        <Detail>큰소리를 소개합니다</Detail>
        <Cards>
          {DetailNote.map((details) => (
            <div key={details.number}>
              <FolderCard details={details} />
            </div>
          ))}
        </Cards>
        <Detail>큰소리 활동</Detail>
        <ActivityContainer>
          <Activity />
        </ActivityContainer>
        <Detail>1학기 큰소리 일정</Detail>
        <TimeLine src={timeline} />
        <Detail>큰소리의 실력이 궁금하다면?</Detail>
        <YoutubeContents />
        <Apply />
        <Footer />
      </Wrapper>
    </>
  );
};

export default HomePage;
const TimeLine = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  max-width: 80%;
  margin-top: 80px;
  margin-bottom: 150px;
`;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 150px;
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin-bottom: 150px;
`;
const Details = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 120px;
  font-family: LeeSeoyun, sans-serif;
  color: #505050;
  line-height: 1.5;
`;
const Detail = styled.div`
  text-align: center;
  font-size: 35px;
  margin-top: 30px;
  font-family: LeeSeoyun, sans-serif;
  color: #505050;
`;
const HeartImg = styled.img`
  width: 220px;
  margin-top: 100px;
`;
const Intro = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-top: 60px;
  font-weight: 300;
  font-family: DNFForgedBlade, sans-serif;
  color: #505050;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-top: 25px;
  text-align: center;
  font-weight: 500;
  font-family: DNFForgedBlade, sans-serif;
  color: #505050;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 100px;
  align-items: center;
  background: white;
  transform: rotate(-10deg);
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
