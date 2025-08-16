import styled from "@emotion/styled";
import {
  deletedReservationIdsAtom,
  reservationIdCounterAtom,
  TeamWeek,
  teamWeekDataAtom,
} from "@/store/weekData.ts";
import BookByWeekNotion from "./BookByWeekNotion";
import PlusButton from "../../../../../public/image/plus-black.svg";
import MinusButton from "../../../../../public/image/minus-black.svg";

import { useEffect, useState } from "react";
import AddInputs from "./AddInputs";
import { useAtom } from "jotai";
import {
  endCalendarDateAtom,
  startCalendarDateAtom,
} from "@/store/calendarData";
import {
  convertSession,
  ReservationSession,
} from "@/mapper/regularReservation/convertSession";
import { ReservationType } from "@/mapper/regularReservation/convertResType";
import {
  convertDayOfWeek,
  DayOfWeekNum,
} from "@/mapper/regularReservation/convertDayOfWeek";

interface DayNotionProps {
  date: TeamWeek;
}

const BookByWeek: React.FC<DayNotionProps> = ({ date }) => {
  const [isActive] = useState<boolean>(date.isActive);
  const [showInputs, setShowInputs] = useState(false);

  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);

  // inputs
  const [regularReservationId, setRegularReservationId] = useAtom(
    reservationIdCounterAtom
  );
  const [regularReservationType, setRegularReservationType] = useState<
    ReservationType | ReservationSession
  >("예약 유형");
  const [regularReservationTeamName, setRegularReservationTeamName] =
    useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [regularReservationSession, setRegularReservationSession] =
    useState<ReservationSession>("보컬");
  const [reservationMemberStudentId, setReservationMemberStudentId] =
    useState("");
  const [
    regularReservationApplyStartDate,
    setRegularReservationApplyStartDate,
  ] = useState("10:00");
  const [regularReservationApplyEndDate, setRegularReservationApplyEndDate] =
    useState("23:00");
  const [startDate] = useAtom(startCalendarDateAtom);
  const [endDate] = useAtom(endCalendarDateAtom);

  // 삭제 id
  const [deletedIds, setDeletedIds] = useAtom(deletedReservationIdsAtom);

  // UTC 문제 해결
  const formatDate = (dateStr: Date) => {
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

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
    // 확인 누르면 input 초기화
    setRegularReservationType("예약 유형");
    setRegularReservationTeamName("");
    setReservationMemberStudentId("");
    setRegularReservationApplyStartDate("10:00");
    setRegularReservationApplyEndDate("23:00");
    setRegularReservationSession("보컬");

    // 팀별 예약 추가
    const newItem: TeamWeek = {
      dayOfWeekNum: date.dayOfWeekNum,
      isActive: date.isActive,
      startTime: date.startTime,
      endTime: date.endTime,
      regularReservations: [
        {
          regularReservationId: regularReservationId,
          dayOfWeek: convertDayOfWeek(date.dayOfWeekNum as DayOfWeekNum),
          regularReservationType:
            regularReservationType === "합주" ? "TEAM" : "LESSON",
          regularReservationSession:
            regularReservationType === "합주"
              ? "ALL"
              : convertSession(regularReservationType as ReservationSession),

          regularReservationTeamName: regularReservationTeamName,
          regularReservationStartTime: regularReservationApplyStartDate,
          regularReservationEndTime: regularReservationApplyEndDate,

          reservationMemberStudentId: reservationMemberStudentId,
          regularReservationApplyStartDate: formattedStartDate,
          regularReservationApplyEndDate: formattedEndDate,
        },
      ],
    };
    setTeamWeekItems((prev) => {
      // 기존에 같은 요일이 있는지 확인
      const existingItemIndex = prev.findIndex(
        (item) => item.dayOfWeekNum === date.dayOfWeekNum
      );

      if (existingItemIndex !== -1) {
        // 이미 존재하는 경우, 기존 아이템에 예약 추가
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].regularReservations.push(
          newItem.regularReservations[0]
        );
        return updatedItems;
      } else {
        // 새로운 아이템 추가
        return [...prev, newItem];
      }
    });
    setRegularReservationId((prev) => prev + 1); // 예약 ID 증가
  };

  const handleDeleteItem = (reservationId: number) => {
    setTeamWeekItems((prev) =>
      prev.map((item) => ({
        ...item,
        regularReservations: item.regularReservations.filter(
          (reservation) => reservation.regularReservationId !== reservationId
        ),
      }))
    );
    // 삭제된 아이템의 ID를 deletedIds에 추가
    setDeletedIds((prev) => [...prev, reservationId]);
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
            .flatMap((item) => item.regularReservations)
            .map((item, idx) => {
              return (
                <BookByWeekNotion
                  key={idx}
                  regularReservationId={item.regularReservationId}
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
