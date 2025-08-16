import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Container from "@/components/Book/BookManage/Container.ts";
import DayNotion from "@/components/Book/BookManage/BasicManage/DayNotion.tsx";
import authApi from "@/api/Instance/authApi.ts";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import ManageModal from "@/components/Book/BookManage/ManageModal.tsx";
import CalendarInput from "./CalendarInputs";
import { teamWeekDataAtom } from "@/store/weekData";
import BookByWeek from "./BookByWeek/BookByWeek";
import {
  deleteRegularReservationIds,
  regularReservationCreateRequestList,
  weeklyScheduleUpdateRequestList,
} from "@/mapper/regularReservation/api/putReservationData";

const BasicManage: React.FC = () => {
  const [teamWeekData, setTeamWeekData] = useAtom(teamWeekDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const weeklyList = weeklyScheduleUpdateRequestList();
  const createList = regularReservationCreateRequestList();
  const deleteIds = deleteRegularReservationIds();

  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);
      setTeamWeekData(response.data);
      console.log(teamWeekData);
    } catch (error) {
      console.log(`에러남:${error}`);
      console.error("예약 관리 가져오기 실패:", error.response?.data || error);
      alert("정보를 불러올 수 없습니다");
    }
  };

  const handleSubmit = async () => {
    try {
      await authApi.put(`/admin/reservation/weekly-schedule/management`, {
        weeklyScheduleUpdateRequestList: weeklyList,
        regularReservationCreateRequestList: createList,
        deleteRegularReservationIds: deleteIds,
      });
      alert("예약 관리 업데이트 성공");
      window.location.reload();
    } catch (error) {
      console.log(`에러남:${error}`);
      console.error("예약 관리 업데이트 실패:", error.response?.data || error);
      alert("정보를 불러올 수 없습니다");
    }
    console.log("주간 예약 업데이트 요청:", {
      weeklyScheduleUpdateRequestList: weeklyList,
      regularReservationCreateRequestList: createList,
      deleteRegularReservationIds: deleteIds,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <CalendarInput />
        {teamWeekData.map((date) => (
          <div
            key={date.dayOfWeekNum}
            className={css`
              // border: 1px solid black;
              width: 750px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <DayNotion date={date} />
            <BookByWeek date={date} />
          </div>
        ))}
        <SumbmitButton onClick={() => setIsModalOpen(true)}>저장</SumbmitButton>
      </Container>
      {isModalOpen && (
        <ManageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStore={handleSubmit}
        />
      )}
    </>
  );
};
export default BasicManage;
const SumbmitButton = styled.button`
  width: 100px;
  padding: 5px;
  color: black;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffefbe;
  &:hover {
    background-color: #ffc927;
    color: white;
  }
`;
