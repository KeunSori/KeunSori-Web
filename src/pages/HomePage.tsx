import NavBar from "../components/navBar/navBar.tsx";
import FolderCard from "../components/Home/FolderCard.tsx";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import logo from "/image/logo.svg";
import heart from "/image/heart.svg";
const HomePage = () => {
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
        <div
          className={css`
            margin: 150px;
          `}
        ></div>
        <FolderCard />
      </Wrapper>
    </>
  );
};

export default HomePage;
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
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fffbf3;
  margin-top: 50px;
  width: 100%;
  height: 100%;
`;
