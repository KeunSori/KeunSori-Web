import NavBar from "../components/navBar/navBar.tsx";
import Wrapper from "../components/Wrapper.tsx";
import recruit from "/image/Recruit.svg";
import styled from "@emotion/styled";
const RecruitPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Image src={recruit} />
        <Go>지원하러가기</Go>
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
      </Wrapper>
    </>
  );
};
export default RecruitPage;
const MoreDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  width: 100%;
  text-align: center;
`;
const RecruitTitle = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 30px;
  width: 60%;
`;
const RecruitDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 23px;
  width: 100%;
  text-align: center;
  line-height: 2.5;
`;
const RecruitContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: center;
  font-family: LeeSeoyun, sans-serif;
  margin-top: 50px;
  font-size: 20px;
  width: 60%;
  text-align: center;
  border: 1px solid #c7c7c7;
  border-radius: 25px;
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
  border-radius: 20px;
  border: 1px solid #fec511;
  text-align: center;
  width: 180px;
  cursor: pointer;
`;
