import { css } from "@emotion/css";
import NavBar from "../components/navBar/navBar.tsx";
import monkey from "/monkey.svg";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 50px);
        `}
      >
        <div>
          <div
            className={css`
              font-size: 80px;
              font-weight: 700;
              margin-bottom: 10px;
            `}
          >
            큰소리
          </div>
          <div
            className={css`
              font-size: 25px;
              font-weight: 400;
            `}
          >
            홍익대학교 컴퓨터공학과 밴드 학회
          </div>
        </div>
        <img
          className={css`
            width: 500px;
          `}
          src={monkey}
          alt="monkey"
        ></img>
      </div>
    </>
  );
};

export default HomePage;
