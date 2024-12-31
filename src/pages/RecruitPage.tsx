import { css } from "@emotion/css";
import crymonkey from "../../public/그림1.png";
import NavBar from "../components/navBar/navBar.tsx";
const RecruitPage = () => {
  return (
    <>
      <NavBar />
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 150px;
        `}
      >
        <img
          className={css`
            width: 400px;
          `}
          src={crymonkey}
          alt="crymonkey"
        />
        <div
          className={css`
            font-size: 60px;
            font-weight: 600;
          `}
        >
          모집 기간이 아닙니다 ㅠ.ㅠ
        </div>
      </div>
    </>
  );
};
export default RecruitPage;
