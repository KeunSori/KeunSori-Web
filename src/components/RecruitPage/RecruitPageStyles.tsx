import styled from "@emotion/styled";

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
      : ""}
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
export {
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
};
