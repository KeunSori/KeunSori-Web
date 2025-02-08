import { Times, Time } from "./styles/Times.tsx";
import { TimeInfo } from "../../Book/Time.ts";

interface TimeContainerProps {
  date: Date | null;
  startTime: TimeInfo | null;
  endTime: TimeInfo | null;
  printEndTime: string;
  isMobile: boolean;
}

const TimeContainer: React.FC<TimeContainerProps> = ({
  date,
  startTime,
  endTime,
  printEndTime,
  isMobile,
}) => {
  return (
    <>
      <Times isMobile={isMobile}>
        <Time>
          {date
            ? `날짜: ${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일`
            : "날짜를 선택해주세요."}
        </Time>
        <Time>
          입실 시간:
          {startTime?.time ? ` ${startTime.time} ` : " 00:00"}
        </Time>
        <Time>
          퇴실 시간:
          {endTime?.time
            ? ` ${printEndTime} 
                    `
            : " 00:00"}
        </Time>
      </Times>
    </>
  );
};
export default TimeContainer;
