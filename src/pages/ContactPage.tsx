import { css } from "@emotion/css";
import NavBar from "../components/navBar/navBar.tsx";
const ContactPage = () => {
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
        <div
          className={css`
            width: 50%;
            font-size: 30px;
            font-weight: 500;
          `}
        >
          찾아오시는 길
        </div>
      </div>
    </>
  );
};

export default ContactPage;
