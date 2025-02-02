import { Global, css } from "@emotion/react";
const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream2.ttf) format("trueType");
        font-weight: 200;
        font-style: normal;
      }
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream1.ttf) format("trueType");
        font-weight: 100;
        font-style: normal;
      }
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream3.ttf) format("trueType");
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream4.ttf) format("trueType");
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream5.ttf) format("trueType");
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: "S-CoreDream";
        src: url(/fonts/S-Core_Dream/SCDream6.ttf) format("trueType");
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: SejongGeulggot;
        src: url(/fonts/SejongGeulggot.ttf) format("truetype");
        font-weight: 300;
        font-style: normal;
      }
      * {
        box-sizing: border-box;
        font-family: "S-CoreDream", sans-serif;
        font-size: 15px;
        font-weight: 300;
      }
      body {
        color: black;
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
        border: 1px solid rgb(231, 231, 231) !important;
        box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
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

      .react-calendar__tile:disabled {
        background-color: white !important;
        color: rgb(169, 169, 169) !important;
        cursor: not-allowed;
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
        color: black !important;
      }

      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        color: black !important;
      }

      .react-calendar__month-view__days__day--neighboringMonth {
        visibility: hidden !important;
      }

      .react-calendar__navigation__label {
        pointer-events: none;
      }
    `}
  />
);

export default GlobalStyle;
