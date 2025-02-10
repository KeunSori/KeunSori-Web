import styled from "@emotion/styled";
const Activity = () => {
  return (
    <>
      <ImagesContainer>
        <ImageContainer>
          <Image />

          <ImageTitle>교습</ImageTitle>
          <ImageDetail>
            관심 있던 악기를 배우고 연주해봐요!
            <br />
            실력에 따른 수준별 수업으로 운영되고 있어
            <br />
            초보자와 실력자 모두 재밌게 배울 수 있답니다
          </ImageDetail>
        </ImageContainer>
        <ImageContainer>
          <Image />
          <ImageTitle>정기 모임</ImageTitle>
          <ImageDetail>
            보드 게임, 볼링부터 롯데 월드까지
            <br />
            방학 중에, 방학 중에도 열리는 다양한 정기 모임
            <br />
            이외에도 많은 번개 모임까지
            <br />
            함께 즐겨요!
          </ImageDetail>
        </ImageContainer>
      </ImagesContainer>

      <ImagesContainer>
        <ImageContainer>
          <Image />
          <ImageTitle>MT</ImageTitle>
          <ImageDetail>
            봄, 가을에 진행되는 MT
            <br />
            재밌는 게임을 하고, 맛있는 음식을 먹으며
            <br />
            큰소리 부원 모두와 친해져요
          </ImageDetail>
        </ImageContainer>
        <ImageContainer>
          <ImageDetail>
            <Image />

            <ImageTitle>학기 중 합주</ImageTitle>
            <ImageDetail>
              비슷한 취향을 가진 학회원들과 팀이 되어
              <br />
              곡을 선정하고 합주를 진행해요!
            </ImageDetail>
          </ImageDetail>
        </ImageContainer>
      </ImagesContainer>
      <ImagesContainer>
        <ImageContainer>
          <Image />
          <ImageDetail>
            <ImageTitle>공연</ImageTitle>
            봄, 가을 정기공연은 물론
            <br />
            공학인의 밤, 컴공인의 밤, 축제 무대까지!
            <br />
            여러 무대에서 우리의 합주를 선보여요!
          </ImageDetail>
        </ImageContainer>
      </ImagesContainer>
    </>
  );
};
export default Activity;
const ImagesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 80px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
`;
const Image = styled.div`
  background: #e0e0e0;
  width: 350px;
  max-width: 350px;
  height: 200px;
`;
const ImageTitle = styled.div`
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 20px;
  font-family: LeeSeoyun, sans-serif;
  color: #505050;
  text-align: center;
`;
const ImageDetail = styled.div`
  font-family: LeeSeoyun, sans-serif;
  font-size: 20px;
  width: 350px;
  line-height: 1.5;
  margin-bottom: 30px;
  height: 100%;
  text-align: center;
`;
