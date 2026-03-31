import { RECRUIT_INFO } from "./recruit.data";
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
            {RECRUIT_INFO.target}
          </RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>모집 세션:</DetailTitle>
          <div style={{ width: "100%" }}>
            <RecruitDetail>{RECRUIT_INFO.sessions}</RecruitDetail>
            <MoreDetail>{RECRUIT_INFO.note}</MoreDetail>
          </div>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>모집 기간:</DetailTitle>
          <RecruitDetail>{RECRUIT_INFO.applyDates}</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>면접 기간:</DetailTitle>
          <RecruitDetail>{RECRUIT_INFO.interviewDates}</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>면접 장소:</DetailTitle>
          <RecruitDetail>{RECRUIT_INFO.interviewPlace}</RecruitDetail>
        </FlexStyle>
        <FlexStyle>
          <DetailTitle>합격 발표:</DetailTitle>
          <RecruitDetail>{RECRUIT_INFO.resultDate}</RecruitDetail>
        </FlexStyle>
      </div>
    </RecruitContent>
  );
};

export default RecruitContents;
