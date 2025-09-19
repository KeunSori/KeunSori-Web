import { Global, css } from "@emotion/react";

export const CalendarGlobalStyle = () => (
  <Global
    styles={css`
      .rdrCalendarWrapper {
        border: 1px solid #ddd; /* 원하는 색으로 변경 가능 */
        border-radius: 8px; /* 둥근 모서리 원하면 추가 */
        overflow: hidden; /* 둥근 모서리 안쪽 내용 잘리게 */
      }
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
