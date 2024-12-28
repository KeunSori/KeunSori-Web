import { Global, css } from "@emotion/react";
import React from "react";
const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;

        font-size: 15px;
        font-weight: 300;
        color: black;
      }
      body {
        margin: 0px;
        padding: 0;
        font-size: 15px;
        font-weight: 300;
        box-sizing: border-box;
        word-break: keep-all;
      }

      input:focus {
        outline: none;
        border-bottom: 1px solid #037ffc;
      }
      a {
        text-decoration: none;
        color: inherit;
      }

      a:visited {
        color: inherit;
      }
      button {
        border: none;
      }
      html {
        scroll-behavior: smooth;
      }
    `}
  />
);

export default GlobalStyle;
