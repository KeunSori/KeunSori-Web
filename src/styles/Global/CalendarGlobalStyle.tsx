import { Global, css } from "@emotion/react";

export const CalendarGlobalStyle = () => (
  <Global
    styles={css`
      .rdrDayNumber span {
        font-size: 12px;
      }

      .rdrWeekDay {
        font-size: 12px;
      }

      .rdrDay {
        height: 40px;
      }
    `}
  />
);
