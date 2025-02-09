import styled from "@emotion/styled";
import { FolderDetailInfo } from "./FolderCard";
interface FolderCardDetailProps {
  details: FolderDetailInfo;
}
const FolderCardDetail: React.FC<FolderCardDetailProps> = ({ details }) => {
  return (
    <>
      <Rectangle detailColor={details.color} />
      <Text />
      <NameTag detailColor={details.color}>{details.type}</NameTag>
      <ContentStyle img={details.image} />
      <TextStyle>{details.content}</TextStyle>
      <NumberStyle detailColor={details.color}>{details.number}</NumberStyle>
      <LongRectangle detailColor={details.color} />
      <BigRectangle detailColor={details.color} />
      <RoundRectangle />
      <WhiteRectangle />
      <WhiteSecondRectangle />
    </>
  );
};
export default FolderCardDetail;

const TextStyle = styled.div`
  position: absolute;
  top: 190px;
  padding: 10px;
  font-family: LeeSeoyun, sans-serif;
  width: 250px;
  height: 30px;
  z-index: 20;
  font-size: 18px;
  line-height: 1.2;
`;
const WhiteSecondRectangle = styled.div`
  position: absolute;
  top: 280px;
  right: 20px;
  width: 50px;
  height: 20px;
  background: #fffbf3;
  z-index: 1;
`;
const WhiteRectangle = styled.div`
  position: absolute;
  top: 240px;
  right: 0;
  width: 30px;
  height: 30px;
  background: #fffbf3;
  z-index: 1;
`;
const RoundRectangle = styled.div`
  position: absolute;
  top: 260px;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #fffbf3;
  z-index: 10;
`;
const BigRectangle = styled.div<{ detailColor: string }>`
  position: absolute;
  top: 210px;
  right: 0;
  width: 60px;
  border-radius: 20px;
  height: 50px;
  background: ${(prop) => prop.detailColor};
  z-index: 10;
`;
const LongRectangle = styled.div<{ detailColor: string }>`
  position: absolute;
  top: 250px;
  left: 0;
  width: 260px;
  border-radius: 20px;
  height: 50px;
  background: ${(prop) => prop.detailColor};
  z-index: 10;
`;
const NameTag = styled.div<{ detailColor: string }>`
  position: absolute;
  top: -30px;
  right: 10px;
  width: 120px;
  height: 25px;
  padding: 5px;
  border-radius: 15px;
  background: ${(prop) => prop.detailColor};
  z-index: 20;
`;
const Text = styled.div`
  position: absolute;
  width: 80px;
  height: 30px;
  top: -30px;
  left: 150px;
  border-radius: 0 0 15px 13px;
  background: #fffbf3;
`;
const Rectangle = styled.div<{ detailColor: string }>`
  position: absolute;
  top: -30px;
  left: 150px;
  width: 50px;
  height: 30px;
  background: ${(prop) => prop.detailColor};
`;
const ContentStyle = styled.div<{ img: string }>`
  background: #e0e0e0;
  height: 150px;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const NumberStyle = styled.div<{ detailColor: string }>`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${(prop) => prop.detailColor};
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 20;
`;
