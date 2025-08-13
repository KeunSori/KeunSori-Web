import styled from "@emotion/styled";
import {
  ReservationType,
  TeamWeek,
  teamWeekDataAtom,
} from "@/store/weekData.ts";
import BookByWeekNotion from "./BookByWeekNotion";
import PlusButton from "../../../../../public/image/plus-black.svg";
import MinusButton from "../../../../../public/image/minus-black.svg";

import { useState } from "react";
import AddInputs from "./AddInputs";
import { useAtom } from "jotai";

interface DayNotionProps {
  date: TeamWeek;
}

const BookByWeek: React.FC<DayNotionProps> = ({ date }) => {
  const [isActive] = useState<boolean>(date.isActive);
  const [showInputs, setShowInputs] = useState(false);

  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);

  // inputs
  const [regularReservationType, setRegularReservationType] =
    useState<ReservationType>("예약 유형");
  const [regularReservationTeamName, setRegularReservationTeamName] =
    useState("");
  const [reservationMemberStudentId, setReservationMemberStudentId] =
    useState("");
  const [
    regularReservationApplyStartDate,
    setRegularReservationApplyStartDate,
  ] = useState("10:00");
  const [regularReservationApplyEndDate, setRegularReservationApplyEndDate] =
    useState("23:00");

  console.log(teamWeekItems);
  const onClickConfirm = () => {
    if (
      !regularReservationTeamName ||
      !regularReservationApplyStartDate ||
      !regularReservationApplyEndDate ||
      !reservationMemberStudentId
    ) {
      alert("모든 값을 입력하세요");
      return;
    }

    const newItem: TeamWeek = {
      dayOfWeekNum: date.dayOfWeekNum,
      isActive: date.isActive,
      startTime: date.startTime,
      endTime: date.endTime,
      regularReservations: [
        {
          regularReservationId: 0,
          dayOfWeek: date.dayOfWeekNum === 0 ? "MONDAY" : "TUESDAY", // 예시로 MONDAY와 TUESDAY 사용
          regularReservationType: regularReservationType,
          regularReservationSession: "보컬", // 예시로 보컬 사용
          regularReservationTeamName: regularReservationTeamName,
          regularReservationStartTime: regularReservationApplyStartDate,
          regularReservationEndTime: regularReservationApplyEndDate,
          reservationMemberId: 0,
          reservationMemberStudentId: reservationMemberStudentId,
          regularReservationApplyStartDate: "2025-08-13",
          regularReservationApplyEndDate: "2025-08-20",
        },
      ],
    };
    setTeamWeekItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (teamNameToDelete: string, dayOfWeekNum: number) => {
    const updated = teamWeekItems.filter((item) => {
      const reservation = item.regularReservations?.[0];
      if (!reservation) return true; // 배열이 비어있으면 삭제하지 않음
      return (
        reservation.regularReservationTeamName !== teamNameToDelete &&
        item.dayOfWeekNum === dayOfWeekNum
      );
    });
    setTeamWeekItems(updated);
  };

  return (
    <Container>
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
              studentId={reservationMemberStudentId}
              setStudentId={setReservationMemberStudentId}
              teamName={regularReservationTeamName}
              setTeamName={setRegularReservationTeamName}
              teamStartTime={regularReservationApplyStartDate}
              teamEndTime={regularReservationApplyEndDate}
              setTeamStartTime={setRegularReservationApplyStartDate}
              setTeamEndTime={setRegularReservationApplyEndDate}
            />
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
          </FlexStyle>

          {teamWeekItems
            .filter((item) => item.dayOfWeekNum === date.dayOfWeekNum)
            .map((item, idx) => {
              const reservation = item.regularReservations?.[0];
              if (!reservation) return null; // 배열이 비어있으면 아무것도 렌더링 안 함

              return (
                <BookByWeekNotion
                  key={idx}
                  dayOfWeekNum={item.dayOfWeekNum}
                  teamName={reservation.regularReservationTeamName}
                  teamStartTime={reservation.regularReservationStartTime}
                  teamEndTime={reservation.regularReservationEndTime}
                  handleDeleteItem={handleDeleteItem}
                />
              );
            })}
        </div>
      )}
    </Container>
  );
};

export default BookByWeek;

const Container = styled.div`
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
