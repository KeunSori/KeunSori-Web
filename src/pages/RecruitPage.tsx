import NavBar from "../components/navBar/navBar.tsx";
import Wrapper from "../components/Wrapper.tsx";
import recruit from "/image/Recruit.svg";
import styled from "@emotion/styled";
import poster from "/image/poster.svg";
import Footer from "../components/Footer.tsx";
const RecruitPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Image src={recruit} />
        <Go href="https://forms.gle/rG5CGppUftwgc6cX7">지원하러가기</Go>
        <RecruitContent>
          <RecruitTitle>큰소리는, 이런 사람을 기다리고 있어요.</RecruitTitle>
          <RecruitDetail>
            음악을 좋아하는 당신 !
            <br />
            취미로 악기를 배워보고 싶은 당신 !
            <br />
            실력자들과 멋진 합주를 즐기고 싶은 당신 !
            <br />
            친구들을 만들고 싶은 당신 !
          </RecruitDetail>
        </RecruitContent>
        <RecruitContent>
          <RecruitTitle>모집 안내</RecruitTitle>
          <RecruitDetail>
            모집 대상: 컴퓨터공학과, 컴퓨터 공학과 진입 예정 자율 전공 재학생
            <br />
            모집 세션: 드럼, 베이스, 기타, 키보드, 보컬
            <MoreDetail>* 여설 보컬, 드럼, 경력자 우대</MoreDetail>
            모집 기간: 1/27(월) ~ 3/12(수)
            <br />
            면접 기간: 3/14(금) ~ 3/17(월)
            <br />
            면접 장소: D동 411호 대면 진행
            <br />
            합격 발표: 3/17(월) ~ 3/19(수)
          </RecruitDetail>
        </RecruitContent>
        <SubContent>
          <RecruitContent isSmail={true}>
            <SubDetail>더 궁금한 점이 있다면?</SubDetail>
            <SubTitle href="/contact">자주 묻는 질문 보러가기</SubTitle>
          </RecruitContent>
          <RecruitContent isSmail={true}>
            <SubDetail>큰소리 공연이 궁금하다면?</SubDetail>
            <SubTitle href="https://www.youtube.com/@keunsori_hongik">
              큰소리 유튜브 보러가기
            </SubTitle>
          </RecruitContent>
        </SubContent>
        <Poster src={poster} />
        <Footer />
      </Wrapper>
    </>
  );
};
export default RecruitPage;
const Poster = styled.img`
  margin: 50px;
  height: 300px;
  @media (max-width: 768px) {
    height: 200px;
  }
`;
const SubTitle = styled.a`
  cursor: pointer;
  font-family: LeeSeoyun, sans-serif;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  color: #505050;
  white-space: nowrap;
`;
const SubDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
  width: 100%;
  text-align: center;
  color: #505050;
`;
const SubContent = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const MoreDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  width: 100%;
  text-align: center;
  color: #505050;
`;
const RecruitTitle = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 30px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  color: #505050;
`;
const RecruitDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 23px;
  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 2;
  }
  width: 100%;
  text-align: center;
  line-height: 2.5;
  color: #505050;
`;
const RecruitContent = styled.div<{ isSmail?: boolean }>`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(prop) => (prop.isSmail ? "30px" : "50px")};
  ${(prop) =>
    prop.isSmail
      ? `@media (max-width:768px){
    width:200px;
    height: 130px;
    padding: 30px;
    }`
      : ""})
  justify-content: center;
  font-family: LeeSeoyun, sans-serif;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  width: 60%;
  text-align: center;
  border: 1px solid #c7c7c7;
  border-radius: 25px;
  color: #505050;
`;
const Image = styled.img`
  margin-top: 50px;
  width: 70%;
  height: 100%;
`;
const Go = styled.a`
  font-family: LeeSeoyun, sans-serif;
  margin-top: 50px;
  font-size: 20px;
  padding: 12px;
  border-radius: 15px;
  @media (max-width: 768px) {
    font-size: 15px;
    width: 100px;
    padding: 10px;
  }

  border: 1px solid #fec511;
  text-align: center;
  width: 180px;
  cursor: pointer;
  color: #505050;
`;
