import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { memo, useCallback, useEffect, useState } from "react";

import {
  deletedReservationIdsAtom,
  fetchedTeamWeekDataAtom,
  TeamWeek,
  teamWeekDataAtom,
} from "@/store/weekData.ts";

import BookByWeekNotion from "./BookByWeekNotion";

import { ReservationSessionEng } from "@/utils/mapper/regularReservation/convertSession";

interface BookByWeekProps {
  date: TeamWeek;
}

const BookByWeek: React.FC<BookByWeekProps> = ({ date }) => {
  const [isActive] = useState<boolean>(date.isActive);
  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);

  const [fetchedTeamWeekData] = useAtom(fetchedTeamWeekDataAtom);
  // 삭제 ids
  const [deletedIds, setDeletedIds] = useAtom(deletedReservationIdsAtom);

  // 서버에 존재하는 id만 삭제 ids 리스트에 추가
  const originalIds = fetchedTeamWeekData
    .flatMap((item) => item.regularReservations)
    .map((r) => r.regularReservationId);

  const handleDeleteItem = useCallback(
    (reservationId: number) => {
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
    },
    [setTeamWeekItems, setDeletedIds, originalIds]
  );

  useEffect(() => {
    console.log("삭제된 아이디들:", deletedIds);
  }, [deletedIds]);

  return (
    <TeamContainer>
      <div>
        {isActive && (
          <>
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
          </>
        )}
      </div>
    </TeamContainer>
  );
};

export default memo(BookByWeek);

const TeamContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  margin-bottom: 16px;
`;
