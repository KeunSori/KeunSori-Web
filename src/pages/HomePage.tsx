import { css } from "@emotion/css";
import NavBar from "../components/navBar/navBar.tsx";
import React from "react";
const HomePage = () => {
  return (
    <>
      <NavBar />
      <div
        className={css`
          margin-top: 50px;
          background: linear-gradient(white, black);
          height: 2000px;
        `}
      ></div>
    </>
  );
};

export default HomePage;
