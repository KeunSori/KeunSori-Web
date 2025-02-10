import styled from "@emotion/styled";
import YouTube from "react-youtube";

const YoutubeContents = () => {
  return (
    <YouTubeContainer>
      <YouTube
        videoId="keNGC4VB3BU"
        opts={{
          host: "https://www.youtube-nocookie.com",
          width: "500",
          height: "100%",
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
  width: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 50px;
  height: 300px;
`;
