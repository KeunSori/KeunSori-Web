import styled from "@emotion/styled";

const FolderCard = () => {
  return (
    <FolderStyle>
      <Rectangle />
      <Text />
      <NameTag>다양한 장르</NameTag>
      <ContentStyle />
      <NumberStyle>3</NumberStyle>
      <LongRectangle />
      <BigRectangle />
      <RoundRectangle />
      <WhiteRectangle />
      <WhiteSecondRectangle />
    </FolderStyle>
  );
};
const WhiteSecondRectangle = styled.div`
  position: absolute;
  top: 280px;
  right: 20px;
  width: 50px;
  height: 20px;
  background: white;
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
const BigRectangle = styled.div`
  position: absolute;
  top: 210px;
  right: 0;
  width: 60px;
  border-radius: 20px;
  height: 50px;
  background: #caa04c;
  z-index: 10;
`;
const LongRectangle = styled.div`
  position: absolute;
  top: 250px;
  left: 0;
  width: 260px;
  border-radius: 20px;
  height: 50px;
  background: #caa04c;
  z-index: 10;
`;
const NameTag = styled.div`
  position: absolute;
  top: -30px;
  right: 10px;
  width: 120px;
  height: 25px;
  padding: 5px;
  border-radius: 15px;
  background: #caa04c;
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
const Rectangle = styled.div`
  position: absolute;
  top: -30px;
  left: 150px;
  width: 50px;
  height: 30px;
  background: #caa04c;
`;
const FolderStyle = styled.div`
  position: relative;
  margin-left: 50px;
  background: #caa04c;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  padding: 20px;
  padding-top: 20px; /* 상단 여백 */
  text-align: center;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: -30px;
    left: 0px;
    width: 150px;
    height: 50px;
    background: #caa04c;
    border-radius: 20px 20px 0 0;
  }
`;

const ContentStyle = styled.div`
  background: #e0e0e0;
  height: 150px;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const NumberStyle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #caa04c;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 20;
`;

export default FolderCard;
