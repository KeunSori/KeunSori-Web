import { css } from "@emotion/css";
import backgroundimg from "/image/home/concert.webp";
import concert from "/image/home/concert-2.webp";
import styled from "@emotion/styled";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import bass from "/image/home/bass.webp";
import vocal from "/image/home/vocal.webp";
import logo from "/image/logowhite.svg";
const Intro = () => {
  const slides = [backgroundimg, concert, bass, vocal];
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleClick = (direction: string) => {
    if (direction === "left") {
      setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
    } else {
      setCurrentSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div
      className={css`
        position: relative;
        height: calc(100vh - 50px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
      `}
    >
      <Slider currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index} src={slide} />
        ))}
      </Slider>
      <IntroText>
        <IoIosArrowBack
          className={css`
            position: absolute;
            left: 5px;
          `}
          onClick={() => handleClick("left")}
          size={70}
        />
        <IoIosArrowForward
          className={css`
            position: absolute;
            right: 5px;
          `}
          onClick={() => handleClick("right")}
          size={70}
        />
        <Title>
          <Img src={logo} />
        </Title>
      </IntroText>
    </div>
  );
};
export default Intro;

const Img = styled.img`
  width: 100%;
  max-width: 300px;
  height: 100%;
  object-fit: cover;
`;

const Slider = styled.div<{ currentSlide: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  display: flex;
  flex-direction: row;
  transform: translateX(-${({ currentSlide }) => currentSlide * 100}%);
  transition: transform 0.5s ease-in-out;
`;
const Slide = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  min-width: 100%;
  background: linear-gradient(#ffffff00, rgb(50, 50, 50)),
    url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;
const IntroText = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-weight: 300;
  color: white;
  z-index: 1;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  text-size: 30px;
`;
