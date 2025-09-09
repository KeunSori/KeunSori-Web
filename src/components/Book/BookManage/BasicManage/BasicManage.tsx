import styled from "@emotion/styled";
import Container from "@/components/Book/BookManage/Container.ts";
import DayNotion from "@/components/Book/BookManage/BasicManage/DayNotion.tsx";
import authApi from "@/api/Instance/authApi.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import ManageModal from "@/components/Book/BookManage/ManageModal.tsx";
import CalendarInput from "./CalendarInputs";
import {
  deletedReservationIdsAtom,
  fetchedTeamWeekDataAtom,
  teamWeekDataAtom,
} from "@/store/weekData";
import BookByWeek from "./BookByWeek/BookByWeek";
import {
  regularReservationCreateRequestList,
  weeklyScheduleUpdateRequestList,
} from "@/utils/mapper/regularReservation/api/putReservationData";

const BasicManage: React.FC = () => {
  // 서버 + UI 상의 데이터
  const [teamWeekData, setTeamWeekData] = useAtom(teamWeekDataAtom);
  // 서버에서 받은 실제 저장 데이터
  const [fetchedTeamWeekData, setFetchedTeamWeekData] = useAtom(
    fetchedTeamWeekDataAtom
  );

  const [deletedIds, setDeletedIds] = useAtom(deletedReservationIdsAtom);
  console.log("deletedIds", deletedIds);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);
      setTeamWeekData(response.data);
      setFetchedTeamWeekData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(`에러남:${error}`);
      console.error("예약 관리 가져오기 실패:", error.response?.data || error);
      alert("정보를 불러올 수 없습니다");
    }
  };

  // useCallback: 의존성이 바뀌지 않은 한 같은 함수 객체를 재사용
  const handleSubmit = useCallback(async () => {
    // 서버에서 받은 예약 id들
    const originalIds = fetchedTeamWeekData
      .flatMap((item) => item.regularReservations)
      .map((r) => r.regularReservationId);
    console.log("originalIds", originalIds);

    const weeklyList = weeklyScheduleUpdateRequestList(teamWeekData);
    const createList = regularReservationCreateRequestList(
      teamWeekData,
      originalIds
    );

    try {
      await authApi.put(`/admin/reservation/weekly-schedule/management`, {
        weeklyScheduleUpdateRequestList: weeklyList,
        regularReservationCreateRequestList: createList,
        deleteRegularReservationIds: deletedIds,
      });
      alert("예약 관리 업데이트에 성공했습니다.");
      setDeletedIds([]); // 초기화
      fetchData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(`에러남:${error}`);
      console.error("예약 관리 업데이트 실패:", error.response?.data || error);
      alert(`요청 실패:\n${error.response?.data.message}`);
    }
    console.log("주간 예약 업데이트 요청:", {
      weeklyScheduleUpdateRequestList: weeklyList,
      regularReservationCreateRequestList: createList,
      deleteRegularReservationIds: deletedIds,
    });
  }, [fetchedTeamWeekData, teamWeekData, deletedIds, setDeletedIds, fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("fetchedTeamWeekData", fetchedTeamWeekData);
  }, [fetchedTeamWeekData]);

  // 컴포넌트 최상단에서 useMemo: 자식의 불필요한 리렌더링 방지
  const stableTeamWeekData = useMemo(() => {
    return teamWeekData.map((date) => ({
      dayOfWeekNum: date.dayOfWeekNum,
      isActive: date.isActive,
      startTime: date.startTime,
      endTime: date.endTime,
      regularReservations: date.regularReservations,
    }));
  }, [teamWeekData]);

  return (
    <>
      <Container>
        <div>
          <CalendarInput />
        </div>

        {stableTeamWeekData.map((date) => {
          return (
            <DayOfWeekStyle key={date.dayOfWeekNum}>
              <DayNotion date={date} />
              <BookByWeek date={date} />
            </DayOfWeekStyle>
          );
        })}
        <SumbmitButton onClick={() => setIsModalOpen(true)}>저장</SumbmitButton>
      </Container>
      {isModalOpen && (
        <ManageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAccept={handleSubmit}
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
const DayOfWeekStyle = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
