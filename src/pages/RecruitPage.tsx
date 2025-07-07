// images
import recruit from "/image/Recruit.svg";
import poster from "/image/poster.svg";

// shared
import NavBar from "@/components/navBar/navBar.tsx";
import Wrapper from "@/styles/Wrapper.ts";
import Footer from "@/styles/Footer.tsx";

//this
import {
  Poster,
  SubTitle,
  SubContent,
  SubDetail,
  MoreDetail,
  RecruitTitle,
  RecruitDetail,
  RecruitContent,
  Image,
  Go,
} from "@/components/RecruitPage/RecruitPageStyles.tsx";

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
