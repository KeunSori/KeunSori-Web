import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  deletedReservationIdsAtom,
  fetchedTeamWeekDataAtom,
  TeamWeek,
  teamWeekDataAtom,
} from "@/store/weekData.ts";

import AddInputs from "./AddInputs";
import BookByWeekNotion from "./BookByWeekNotion";
import { useTeamReservation } from "@/hooks/useTeamReservation";

import PlusButton from "@/assets/reservation/plus-black.svg";
import MinusButton from "@/assets/reservation/minus-black.svg";
import { ReservationSessionEng } from "@/utils/mapper/regularReservation/convertSession";

interface BookByWeekProps {
  date: TeamWeek;
}

const BookByWeek: React.FC<BookByWeekProps> = ({ date }) => {
  const [isActive] = useState<boolean>(date.isActive);
  const [showInputs, setShowInputs] = useState(false);
  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);

  // 팀 예약 확인 버튼 클릭 시 저장하는 훅
  const {
    onClickConfirmReservation,
    regularReservationType,
    setRegularReservationType,
    regularReservationTeamName,
    setRegularReservationTeamName,
    teamLeaderStudentId,
    setTeamLeaderStudentId,
    regularReservationStartTime,
    setRegularReservationStartTime,
    regularReservationEndTime,
    setRegularReservationEndTime,
  } = useTeamReservation(date);

  const [fetchedTeamWeekData] = useAtom(fetchedTeamWeekDataAtom);
  // 삭제 ids
  const [deletedIds, setDeletedIds] = useAtom(deletedReservationIdsAtom);

  // 서버에 존재하는 id만 삭제 ids 리스트에 추가
  const originalIds = fetchedTeamWeekData
    .flatMap((item) => item.regularReservations)
    .map((r) => r.regularReservationId);

  const handleDeleteItem = (reservationId: number) => {
    setTeamWeekItems((prev) =>
      prev.map((item) => ({
        ...item,
        regularReservations: item.regularReservations.filter(
          (reservation) => reservation.regularReservationId !== reservationId
        ),
      }))
    );
    // 서버에 존재하는 id만 삭제 ids 리스트에 추가
    if (originalIds.includes(reservationId)) {
      setDeletedIds((prev) => [...prev, reservationId]);
    }
  };

  useEffect(() => {
    console.log("삭제된 아이디들:", deletedIds);
  }, [deletedIds]);

  return (
    <TeamContainer>
      {showInputs ? (
        <ButtonStyle
          isActive={isActive}
          src={MinusButton}
          onClick={() => {
            setShowInputs(false);
            console.log("clicked");
          }}
        />
      ) : (
        <ButtonStyle
          isActive={isActive}
          src={PlusButton}
          onClick={() => {
            if (!isActive) return;
            setShowInputs(true);
            console.log("clicked");
          }}
        />
      )}
      {showInputs && (
        <div>
          <FlexStyle>
            <AddInputs
              reservationType={regularReservationType}
              setReservationType={setRegularReservationType}
              isActive={isActive}
              studentId={teamLeaderStudentId}
              setStudentId={setTeamLeaderStudentId}
              teamName={regularReservationTeamName}
              setTeamName={setRegularReservationTeamName}
              teamStartTime={regularReservationStartTime}
              teamEndTime={regularReservationEndTime}
              setTeamStartTime={setRegularReservationStartTime}
              setTeamEndTime={setRegularReservationEndTime}
            />
            <ConfirmButton onClick={onClickConfirmReservation}>
              확인
            </ConfirmButton>
          </FlexStyle>

          {teamWeekItems
            .filter((item) => item.dayOfWeekNum === date.dayOfWeekNum)
            .flatMap((item) => item.regularReservations)
            .map((item, idx) => {
              return (
                <BookByWeekNotion
                  key={idx}
                  regularReservationId={item.regularReservationId}
                  reservationSessionEng={
                    item.regularReservationSession as ReservationSessionEng
                  }
                  applyStartDate={item.regularReservationApplyStartDate}
                  applyEndDate={item.regularReservationApplyEndDate}
                  teamName={item.regularReservationTeamName}
                  teamStartTime={item.regularReservationStartTime}
                  teamEndTime={item.regularReservationEndTime}
                  handleDeleteItem={handleDeleteItem}
                />
              );
            })}
        </div>
      )}
    </TeamContainer>
  );
};

export default BookByWeek;

const TeamContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  margin-bottom: 10px;
`;
const ButtonStyle = styled.img<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;

  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};
`;
const ConfirmButton = styled.button`
  background-color: #ffefbe;
  &:hover {
    background-color: #ffc927;
    color: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  border-radius: 5px;
  height: 30px;
  margin-left: 10px;
`;

const FlexStyle = styled.div`
  display: flex;
  align-items: center;
`;
