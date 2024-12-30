import { css } from "@emotion/css";
import NavBar from "../components/navBar/navBar.tsx";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: calc(100vh - 50px);
        `}
      >
        <div
          className={css`
            font-size: 80px;
            font-weight: 700;
            margin: 10px;
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
    </>
  );
};

export default HomePage;
