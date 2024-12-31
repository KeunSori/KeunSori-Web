import { css } from "@emotion/css";
import crymonkey from "../../public/crymonkey.svg";
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
        <img src={crymonkey} alt="crymonkey" />
        <h1>Recruit Page</h1>
      </div>
    </>
  );
};
export default RecruitPage;
