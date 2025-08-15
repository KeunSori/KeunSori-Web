import { useEffect, useState } from "react";
import TimeSelecter from "@/components/Book/BookManage/TimeSelecter.tsx";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { getUpdateWeekDateWithTime } from "@/utils/weekDataTimeUtils";
import { TeamWeek, teamWeekDataAtom } from "@/store/weekData";
import BookByWeek from "./BookByWeek";
interface DayNotionProps {
  date: TeamWeek;
}

const DayNotion: React.FC<DayNotionProps> = ({ date }) => {
  const [isActive, setIsActive] = useState<boolean>(date.isActive);
  const [weekData, setWeekData] = useAtom(teamWeekDataAtom);
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const handleClick =
    (timeType: "startTime" | "endTime") =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const value = e.currentTarget.getAttribute("value");
      if (value) {
        const newWeekData = getUpdateWeekDateWithTime(
          weekData,
          date.dayOfWeekNum,
          timeType,
          value
        );
        setWeekData(newWeekData);
      }
    };
  const handleCheck = (isActive: boolean) => {
    setIsActive(!isActive);
    setWeekData(
      weekData.map((data) =>
        data.dayOfWeekNum === date.dayOfWeekNum
          ? { ...data, isActive: !isActive }
          : data
      )
    );
  };
  useEffect(() => {}, [weekData]);

  return (
    <>
      <Container>
        <Input
          type="checkbox"
          defaultChecked={isActive}
          onChange={() => handleCheck(isActive)}
        />
        <DayContainer isActive={isActive}>
          <span>{days[date.dayOfWeekNum]}</span>
          <TimeSelecter
            disabled={isActive}
            startTime={date.startTime}
            onClick={handleClick("startTime")}
          />
          부터
          <TimeSelecter
            disabled={isActive}
            endTime={date.endTime}
            onClick={handleClick("endTime")}
          />
          까지
        </DayContainer>
      </Container>

      <BookByWeek date={date} />
    </>
  );
};

export default DayNotion;

const Input = styled.input`
  width: 13px;
`;
const DayContainer = styled.div<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? "black" : "#c4c4c4")};
  cursor: ${(props) => (props.isActive ? "null" : "not-allowed")};
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Container = styled.div`
  display: flex;
  gap: 5px;
`;
