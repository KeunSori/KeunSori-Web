import {
  DetailTitle,
  FlexStyle,
  MoreDetail,
  RecruitContent,
  RecruitDetail,
  RecruitTitle,
} from "./RecruitPageStyles";

const RecruitContents = () => {
  return (
    <RecruitContent>
      <RecruitTitle>모집 안내</RecruitTitle>
      <div>
        <FlexStyle>
          <DetailTitle>모집 대상:</DetailTitle>
          <RecruitDetail>
            홍익대 컴퓨터공학과, 컴퓨터 공학과 진입 예정 자율 전공 재학생 및
            휴학생
          </RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>모집 세션:</DetailTitle>
          <div style={{ width: "100%" }}>
            <RecruitDetail> 드럼, 베이스, 기타, 키보드, 보컬</RecruitDetail>
            <MoreDetail>* 여설 보컬, 기타, 드럼, 경력자 우대</MoreDetail>
          </div>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>모집 기간:</DetailTitle>
          <RecruitDetail>7/23 (수) ~ 9/7 (일)</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>면접 기간:</DetailTitle>
          <RecruitDetail>9/8 (월) ~ 9/12 (금)</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>면접 장소:</DetailTitle>
          <RecruitDetail>D동 411호 대면 진행</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>합격 발표:</DetailTitle>
          <RecruitDetail>9/14 (일) 개별 문자 통보</RecruitDetail>
        </FlexStyle>
      </div>
    </RecruitContent>
  );
};

export default RecruitContents;
