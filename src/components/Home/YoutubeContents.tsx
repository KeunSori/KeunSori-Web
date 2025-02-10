import styled from "@emotion/styled";
import YouTube from "react-youtube";
import useIsMobile from "../mobile/useIsMobile";

const YoutubeContents = () => {
  const isMobile = useIsMobile();
  return (
    <YouTubeContainer>
      <YouTube
        videoId="keNGC4VB3BU"
        opts={{
          host: "https://www.youtube-nocookie.com",
          width: `${isMobile ? "300" : "550"}`,
          height: `${isMobile ? "200" : "350"}`,
          playerVars: {
            autoplay: 0,
            rel: 0,
          },
        }}
      />
    </YouTubeContainer>
  );
};
export default YoutubeContents;
const YouTubeContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 50px;
  height: 300px;
`;
