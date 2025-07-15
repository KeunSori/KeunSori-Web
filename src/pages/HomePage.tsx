// libraries
import { css } from "@emotion/css";

// images
import heart from "/image/home/heart.svg";
import timeline from "/image/home/timeline.svg";
import room from "/image/home/room.jpeg";
import family from "/image/home/family.jpeg";
import kawai from "/image/home/kawai.png";

// shared
import NavBar from "@/components/navBar/navBar.tsx";
import Wrapper from "@/styles/Wrapper.ts";
import Footer from "@/styles/Footer.tsx";

// this
import FolderCard from "@/components/HomePage/FolderCard.tsx";
import Activity from "@/components/HomePage/Activity.tsx";
import Apply from "@/components/HomePage/Apply.tsx";
import YoutubeContents from "@/components/HomePage/YoutubeContents.tsx";
import Intro from "@/components/HomePage/Intro.tsx";
import {
  TimeLine,
  ActivityContainer,
  Cards,
  Details,
  Detail,
  HeartImg,
} from "../components/HomePage/HomePageStyles.tsx";
import { Helmet } from "react-helmet";

import { useEffect } from "react";
interface FolderDetailInfo {
  color: string;
  type: string;
  image: string;
  content: string;
  number: number;
}

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const DetailNote: FolderDetailInfo[] = [
    {
      color: "#FEC039",
      type: "따뜻한 분위기",
      image: `${family}`,
      content: "따뜻하고 가족 같은 분위기로 선배들과 친구들을 사귀기 쉬워요",
      number: 1,
    },
    {
      color: "#FFE33A",
      type: "좋은 장비",
      image: `${room}`,
      content: "개인 악기가 없어도 학회에 있는 악기들로 활동 할 수 잇어요",
      number: 2,
    },
    {
      color: "#E6CE86",
      type: "다양한 장르",
      image: `${kawai}`,
      content:
        "부원이 많아 음악장르가 다양해요 취향이 맞는 친구와 합주를 즐길 수 있어요",
      number: 3,
    },
  ];
  return (
    <>
      <Helmet>
        <title>큰소리 – 홍익대 컴퓨터공학과 밴드학회(컴공)</title>
        <meta
          name="description"
          content="홍익대학교 컴퓨터공학과 밴드학회 '큰소리'를 소개합니다!"
        />
        <meta
          property="og:title"
          content="큰소리 – 홍익대 컴퓨터공학과 밴드학회"
        />
        <meta
          property="og:description"
          content="1999년부터 이어진 홍익대 컴공 밴드학회, 지금 바로 만나보세요!"
        />
        <meta
          property="og:image"
          content="https://keunsori.com/image/logo.svg"
        />
        <meta property="og:url" content="https://keunsori.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <NavBar />
      <Intro />
      <Wrapper>
        <div
          className={css`
            margin: 50px;
          `}
        />
        <HeartImg src={heart} />
        <Detail>
          <Details>
            홍익대학교 컴퓨터공학과 밴드 학회 큰소리는
            <br />
            1987년에 만들어진 전통 있는 학회로,
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
