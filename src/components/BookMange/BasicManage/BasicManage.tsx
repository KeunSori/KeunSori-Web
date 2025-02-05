import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Container from "../Container";
import DayNotion from "./DayNotion";
import axiosInstance from "../../../api/axiosInstance";
import { useEffect } from "react";
interface Week {
  dayOfWeekNum: number;
  isActive: boolean;
  startTime: string;
  endTime: string;
}
const weekData: Week[] = [
  { dayOfWeekNum: 0, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 1, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 2, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 3, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 4, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 5, isActive: false, startTime: "10:00", endTime: "11:00" },
  { dayOfWeekNum: 6, isActive: false, startTime: "10:00", endTime: "11:00" },
];
const BasicManage: React.FC = () => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/reservation/weekly-schedule`
      );

      console.log(response.data);
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `/admin/reservation/weekly-schedule`,
        weekData
      );
      console.log("데이터 보냄");
      console.log(response.data);
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        {weekData.map((date) => (
          <div
            key={date.dayOfWeekNum}
            className={css`
              display: flex;
              align-items: center;
              gap: 10px;
            `}
          >
            <DayNotion date={date} />
          </div>
        ))}
        <SumbmitButton onClick={handleSubmit}>저장</SumbmitButton>
      </Container>
    </>
  );
};
export default BasicManage;
const SumbmitButton = styled.button`
  width: 100px;
  padding: 5px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffefbe;
  &:hover {
    background-color: #ffc927;
    color: white;
  }
`;
