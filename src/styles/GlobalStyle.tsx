import { Global, css } from "@emotion/react";
import fonts from "../assets/font/font.ts";
const GlobalStyle = () => (
  <Global
    styles={css`
      ${fonts}
      * {
        box-sizing: border-box;
        font-family: "Spoqa Han Sans Neo", "Spoqa Han Sans JP", sans-serif;
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
      .react-calendar {
        width: 380px !important;
        max-width: 100%;
        background: white;
        padding: 20px;
        border: none !important;
        border-radius: 20px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
        font-family: "Nanum Gothic", "sans-serif" !important;
        font-size: 10px;
        line-height: 1.3 !important;
      }

      .react-calendar button {
        margin: 0;
        border: 0;
        outline: none;
        border-radius: 10px;
      }

      .react-calendar button:enabled:hover {
        cursor: pointer;
      }

      .react-calendar__navigation {
        display: flex;
        height: 44px;
        margin-bottom: 1em;
      }

      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: white !important;
      }

      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font: inherit;
        font-size: 0.75em;
        font-weight: bold;
      }

      .react-calendar__month-view__weekdays__weekday {
        padding: 0.5em;
        text-decoration: none !important;
        border: none !important;
      }

      .react-calendar__tile--now {
        background: #f1f1f1 !important;
      }

      .react-calendar__tile--active {
        background: #ffe187 !important;
        color: white !important;
      }

      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: !important;
        color: white !important;
      }

      .react-calendar__month-view__days__day--neighboringMonth {
        visibility: hidden !important;
      }
    `}
  />
);

export default GlobalStyle;
