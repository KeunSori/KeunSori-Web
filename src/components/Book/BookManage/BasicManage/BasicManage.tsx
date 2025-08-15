import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Container from "@/components/Book/BookManage/Container.ts";
import DayNotion from "@/components/Book/BookManage/BasicManage/DayNotion.tsx";
import authApi from "@/api/Instance/authApi.ts";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import ManageModal from "@/components/Book/BookManage/ManageModal.tsx";
import CalendarInput from "./CalendarInputs";
import { deletedReservationIdsAtom, teamWeekDataAtom } from "@/store/weekData";

const BasicManage: React.FC = () => {
  const [weekData, setWeekData] = useAtom(teamWeekDataAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedIds] = useAtom(deletedReservationIdsAtom);
  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);

      setWeekData(response.data);
      console.log(weekData);
    } catch (error) {
      console.log(`에러남:${error}`);
      alert("정보를 불러올 수 없습니다");
    }
  };

  // 팀별 예약 PUT 데이터 형식으로 변환
  const weeklyScheduleUpdateRequestList = weekData.map((item) => ({
    dayOfWeekNum: item.dayOfWeekNum,
    isActive: item.isActive,
    startTime: item.startTime,
    endTime: item.endTime,
  }));

  const regularReservationCreateRequestList = weekData.flatMap((item) =>
    item.regularReservations.map((r) => ({
      dayOfWeek: r.dayOfWeek,
      regularReservationStartTime: r.regularReservationStartTime,
      regularReservationEndTime: r.regularReservationEndTime,
      regularReservationType: r.regularReservationType,
      regularReservationSession: r.regularReservationSession,
      regularReservationTeamName: r.regularReservationTeamName,
      regularReservationApplyStartDate: r.regularReservationApplyStartDate,
      regularReservationApplyEndDate: r.regularReservationApplyEndDate,
      reservationMemberStudentId: r.reservationMemberStudentId,
    }))
  );
  const deleteRegularReservationIds = deletedIds; // 삭제 시 기록한 ID 배열

  const handleSubmit = async () => {
    try {
      await authApi.put(`/admin/reservation/weekly-schedule/management`, {
        weeklyScheduleUpdateRequestList,
        regularReservationCreateRequestList,
        deleteRegularReservationIds,
      });
      window.location.reload();
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
        <CalendarInput />
        {weekData.map((date) => (
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
