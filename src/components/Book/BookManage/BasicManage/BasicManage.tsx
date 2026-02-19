import styled from "@emotion/styled";
import Container from "@/components/Book/BookManage/Container.ts";
import DayNotion from "@/components/Book/BookManage/BasicManage/DayNotion.tsx";
import authApi from "@/api/Instance/authApi.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import ManageModal from "@/components/Book/BookManage/ManageModal.tsx";
import {
  deletedReservationIdsAtom,
  fetchedTeamWeekDataAtom,
  teamWeekDataAtom,
} from "@/store/weekData";
import BookByWeek from "./BookByWeek/BookByWeek";
import {
  regularReservationCreateRequestList,
  regularReservationTimeUpdateList,
  weeklyScheduleUpdateRequestList,
} from "@/utils/mapper/regularReservation/api/putReservationData";
import AddInputs from "./BookByWeek/AddInputs";

const BasicManage: React.FC = () => {
  // 서버 + UI 상의 데이터
  const [teamWeekData, setTeamWeekData] = useAtom(teamWeekDataAtom);
  // 서버에서 받은 실제 저장 데이터
  const [fetchedTeamWeekData, setFetchedTeamWeekData] = useAtom(
    fetchedTeamWeekDataAtom,
  );

  const [deletedIds, setDeletedIds] = useAtom(deletedReservationIdsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await authApi.get(`/admin/reservation/weekly-schedule`);
      setTeamWeekData(response.data);
      setFetchedTeamWeekData(response.data);
    } catch (error: any) {
      console.log(`에러남:${error}`);
      console.error("예약 관리 가져오기 실패:", error.response?.data || error);
      alert("정보를 불러올 수 없습니다");
    }
  };

  // useCallback: 의존성이 바뀌지 않은 한 같은 함수 객체를 재사용
  const handleSubmit = useCallback(async () => {
    const weeklyList = weeklyScheduleUpdateRequestList(teamWeekData);
    // 신규 예약만
    const createList = regularReservationCreateRequestList(
      teamWeekData,
      fetchedTeamWeekData,
    );
    // 기존 예약 중 시간만 변경된 것
    const timeUpdateList = regularReservationTimeUpdateList(
      teamWeekData,
      fetchedTeamWeekData,
    );

    try {
      // 1️⃣ create / delete / weekly
      if (weeklyList.length || createList.length || deletedIds.length) {
        console.log("주간 예약 업데이트 요청:", {
          weeklyScheduleUpdateRequestList: weeklyList,
          regularReservationCreateRequestList: createList,
          deleteRegularReservationIds: deletedIds,
        });
        await authApi.put("/admin/reservation/weekly-schedule/management", {
          weeklyScheduleUpdateRequestList: weeklyList,
          regularReservationCreateRequestList: createList,
          deleteRegularReservationIds: deletedIds,
        });
      }

      // 2️⃣ time update (수정만)
      if (timeUpdateList.length > 0) {
        console.log("시간 업데이트 요청 리스트:", timeUpdateList);
        await authApi.put(
          "/admin/reservation/regular-reservations/time",
          timeUpdateList,
        );
      }
      alert("예약 관리 업데이트에 성공했습니다.");
      setDeletedIds([]); // 초기화
      fetchData();
    } catch (error: any) {
      console.error("예약 관리 업데이트 실패:", error.response?.data || error);
      alert(`요청 실패:\n${error.response?.data.message}`);
    }
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FlexStyle>
            <AddInputs />
          </FlexStyle>
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
const FlexStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;
