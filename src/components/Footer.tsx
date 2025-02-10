import styled from "@emotion/styled";
import KakaoTalk from "/image/kakaotalk.svg";
import Instagram from "/image/instagram.svg";
import Youtube from "/image/youtube.svg";

const Footer: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Ptag>홍익대학교 컴퓨터공학과 밴드 학회 큰소리</Ptag>
        <Apps>
          <AppImg
            src={KakaoTalk}
            onClick={() =>
              window.open("https://pf.kakao.com/_xmDfsn", "_blank")
            }
          />
          <AppImg
            src={Instagram}
            onClick={() =>
              window.open(
                "https://www.instagram.com/keunsori_1990?igsh=cW90Y2J6ZGp2MGkz",
                "_blank"
              )
            }
          />
          <AppImg
            src={Youtube}
            onClick={() =>
              window.open("https://www.youtube.com/@keunsori_hongik", "_blank")
            }
          />
        </Apps>
        <Copyright>Copyright ⓒ 2025 KEUN. All Rights Reserved</Copyright>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 150px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding-bottom: 100px;
`;

const Ptag = styled.p`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-family: LeeSeoyun, sans-serif;
  color: #505050;
`;

const Apps = styled.div`
  display: flex;
  gap: 18px;
`;

const AppImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Copyright = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 80px;
  color: #8e8e8e;
  font-size: 20px;
  font-family: LeeSeoyun, sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;
`;
