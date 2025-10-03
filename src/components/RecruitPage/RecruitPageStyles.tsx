import styled from "@emotion/styled";

// 공통 스타일 변수
const baseFont = `
  font-family: ImHyeMin, sans-serif;
  color: #505050;
`;

const responsiveFont = (desktop: string, mobile: string) => `
  font-size: ${desktop};
  @media (max-width: 768px) {
    font-size: ${mobile};
  }
`;

// 실제 컴포넌트
const Poster = styled.img`
  margin: 50px;
  height: 300px;
  @media (max-width: 768px) {
    height: 200px;
  }
`;
const SubTitle = styled.a`
  ${baseFont}
  ${responsiveFont("25px", "20px")}
  white-space: nowrap;
  cursor: pointer;
`;
const SubDetail = styled.div`
  ${baseFont}
  ${responsiveFont("20px", "15px")}
  width: 100%;
  text-align: center;
`;
const SubContent = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const MoreDetail = styled.div`
  ${baseFont}
  ${responsiveFont("20px", "12px")}
  width: 100%;
  text-align: center;
  color: #505050;
  margin-bottom: 20px;
`;
const RecruitTitle = styled.div`
  ${baseFont}
  ${responsiveFont("30px", "20px")}
  color: #505050;
`;
const RecruitDetail = styled.div`
  ${baseFont}
  ${responsiveFont("23px", "13px")}
  @media (max-width: 768px) {
    line-height: 2;
  }
  width: 100%;
  text-align: center;
  line-height: 2.5;
  color: #505050;
`;
const DetailTitle = styled.div`
  ${baseFont}
  ${responsiveFont("23px", "13px")}
  @media (max-width: 768px) {
    line-height: 2;
  }
  width: 40%;
  text-align: center;
  line-height: 2.5;
  color: #505050;

  font-weight: 600;
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
      : ""}
  justify-content: center;
  ${baseFont}
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
  ${baseFont}
  ${responsiveFont("20px", "15px")}
  @media (max-width: 768px) {
    width: 100px;
    padding: 10px;
  }

  margin-top: 50px;
  padding: 12px;
  border: 1px solid #fec511;
  border-radius: 15px;
  text-align: center;
  width: 180px;
  cursor: pointer;
  color: #505050;
`;
const FlexStyle = styled.div`
  display: flex;
  gap: 15px;
`;
export {
  Poster,
  SubTitle,
  SubContent,
  SubDetail,
  MoreDetail,
  RecruitTitle,
  RecruitDetail,
  DetailTitle,
  RecruitContent,
  Image,
  Go,
  FlexStyle,
};
