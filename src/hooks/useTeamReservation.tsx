/* eslint-disable @typescript-eslint/no-unused-vars */
import authApi from "@/api/Instance/authApi";
import {
  convertDayOfWeek,
  DayOfWeekNum,
} from "@/utils/mapper/regularReservation/convertDayOfWeek";
import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import {
  convertSessionEng,
  ReservationSessionKor,
} from "@/utils/mapper/regularReservation/convertSession";
import {
  endCalendarDateAtom,
  startCalendarDateAtom,
} from "@/store/calendarData";
import {
  reservationIdCounterAtom,
  TeamWeek,
  teamWeekDataAtom,
} from "@/store/weekData";
import { formatDateYYYYMMDD } from "@/utils/dateUtils";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { TimeString } from "@/store/Time";

interface ReservationInput {
  dayOfWeekNum: number;
  regularReservationType: ReservationType | ReservationSessionKor;
  regularReservationTeamName: string;
  teamLeaderStudentId: string;
  regularReservationStartTime: TimeString;
  regularReservationEndTime: TimeString;
}

export const useTeamReservation = ({
  dayOfWeekNum,
  regularReservationType,
  regularReservationTeamName,
  teamLeaderStudentId,
  regularReservationStartTime,
  regularReservationEndTime,
}: ReservationInput) => {
  // atom
  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);
  const [regularReservationId, setRegularReservationId] = useAtom(
    reservationIdCounterAtom
  );
  const [startDate] = useAtom(startCalendarDateAtom);
  const [endDate] = useAtom(endCalendarDateAtom);

  // state
  const formattedStartDate = formatDateYYYYMMDD(startDate);
  const formattedEndDate = formatDateYYYYMMDD(endDate);

  // 예약 ID를 서버에서 가져오기
  useEffect(() => {
    const fetchReservationId = async () => {
      try {
        const response = await authApi.get(
          `/admin/reservation/weekly-schedule`
        );

        const allIds = response.data.flatMap((item: TeamWeek) =>
          item.regularReservations.map((res) => res.regularReservationId)
        );

        const maxId = Math.max(...allIds, 0); // 0을 기본값으로 사용하여 빈 배열 처리
        setRegularReservationId(maxId + 1); // 저장된 max id
        console.log("다음으로 저장할 예약 ID 값:", maxId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(`에러남:${error}`);
        console.error("예약 id 가져오기 실패:", error.response?.data || error);
        alert("정보를 불러올 수 없습니다");
      }
    };

    fetchReservationId();
  }, []);

  // 팀 시작~끝 시간을 주간 시작~끝 시간에 맞게 맞추기
  // useEffect(() => {
  //   if (teamWeekItems.length > 0) {
  //     const todayDay = teamWeekItems.find(
  //       (item) => item.dayOfWeekNum === date.dayOfWeekNum
  //     );

  //     if (todayDay) {
  //       setRegularReservationStartTime(todayDay.startTime || "10:00");
  //       setRegularReservationEndTime(todayDay.endTime || "23:00");
  //     }
  //   }
  // }, [teamWeekItems, date.dayOfWeekNum]);

  // 팀별 예약 확인 버튼 클릭 시 저장하는 함수
  const onClickConfirmReservation = () => {
    if (
      regularReservationType === "예약 유형" ||
      !regularReservationTeamName ||
      !regularReservationStartTime ||
      !regularReservationEndTime ||
      !teamLeaderStudentId
    ) {
      alert("모든 값을 입력하세요");
      return;
    }
    // 확인 누르면 input 초기화
    // setRegularReservationType("예약 유형");
    // setRegularReservationTeamName("");
    // setTeamLeaderStudentId("");

    // 팀별 예약 추가
    const newItem: TeamWeek = {
      dayOfWeekNum: dayOfWeekNum,
      isActive: true,
      startTime: regularReservationStartTime,
      endTime: regularReservationEndTime,
      regularReservations: [
        {
          regularReservationId: regularReservationId,
          dayOfWeek: convertDayOfWeek(dayOfWeekNum as DayOfWeekNum),
          regularReservationType:
            regularReservationType === "합주" ? "TEAM" : "LESSON",
          regularReservationSession:
            regularReservationType === "합주"
              ? "ALL"
              : convertSessionEng(
                  regularReservationType as ReservationSessionKor
                ),

          regularReservationTeamName: regularReservationTeamName,
          regularReservationStartTime: regularReservationStartTime,
          regularReservationEndTime: regularReservationEndTime,

          TeamLeaderStudentId: teamLeaderStudentId,
          regularReservationApplyStartDate: formattedStartDate,
          regularReservationApplyEndDate: formattedEndDate,
        },
      ],
    };

    console.log("reservationId", regularReservationId);

    // teamWeekItems에 새로운 아이템 추가 (화면에 렌더링할 목적)
    setTeamWeekItems((prev) => {
      // 기존에 같은 요일이 있는지 확인
      const existingItemIndex = prev.findIndex(
        (item) => item.dayOfWeekNum === dayOfWeekNum
      );

      if (existingItemIndex !== -1) {
        // 이미 존재하는 경우, 기존 아이템에 예약 추가
        const updatedItems = [...prev];
        const existingItem = updatedItems[existingItemIndex];

        updatedItems[existingItemIndex] = {
          ...existingItem,
          regularReservations: [
            ...existingItem.regularReservations,
            newItem.regularReservations[0],
          ],
        };
        return updatedItems;
      } else {
        // 새로운 아이템 추가
        return [...prev, newItem];
      }
    });
    setRegularReservationId((prev) => prev + 1); // 다음 id를 그 다음부터 사용
  };

  console.log("UI상의 teamWeekItems:", teamWeekItems);

  return {
    onClickConfirmReservation,
  };
};
