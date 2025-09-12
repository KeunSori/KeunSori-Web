import styled from "@emotion/styled";
// import { TeamWeek } from "@/store/weekData";
import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import TypeSelect from "./TypeSelect";
import TimeSelecter from "../../TimeSelecter";
import { ReservationSessionKor } from "@/utils/mapper/regularReservation/convertSession";
import { TimeString } from "@/store/Time";

import DayOfWeekSelect from "./DayOfWeekSelect";
import { useState } from "react";
import { useTeamReservation } from "@/hooks/useTeamReservation";

const AddInputs = () => {
  const handleClick =
    (timeType: "teamStartTime" | "teamEndTime") =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const value = e.currentTarget.getAttribute("value");
      if (value) {
        if (timeType === "teamStartTime") {
          setTeamStartTime(value as TimeString);
        } else {
          setTeamEndTime(value as TimeString);
        }
      }
    };

  const [dayOfWeekName, setDayOfWeekName] = useState("요일 선택");

  const [reservationType, setReservationType] = useState<
    ReservationType | ReservationSessionKor
  >("예약 유형");
  const [teamName, setTeamName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [teamStartTime, setTeamStartTime] = useState<TimeString>("10:00");
  const [teamEndTime, setTeamEndTime] = useState<TimeString>("23:00");

  // 문자열 요일 -> 숫자 변환 매핑
  const dayOfWeekMap: Record<string, number> = {
    일요일: 0,
    월요일: 1,
    화요일: 2,
    수요일: 3,
    목요일: 4,
    금요일: 5,
    토요일: 6,
  };
  const dayOfWeekNumber = dayOfWeekMap[dayOfWeekName] ?? -1; // 잘못된 값이면 -1

  // 팀 예약 확인 버튼 클릭 시 저장하는 훅
  const { onClickConfirmReservation } = useTeamReservation({
    dayOfWeekNum: dayOfWeekNumber,
    regularReservationType: reservationType,
    regularReservationTeamName: teamName,
    teamLeaderStudentId: studentId,
    regularReservationStartTime: teamStartTime,
    regularReservationEndTime: teamEndTime,
  });

  return (
    <Container>
      <div>요일/시간 선택</div>
      <FlexContainer style={{ marginBottom: "15px" }}>
        <FlexContainer>
          <DayOfWeekSelect
            dayOfWeekName={dayOfWeekName}
            setDayOfWeekName={setDayOfWeekName}
          />
        </FlexContainer>

        <TimeContainer style={{ marginLeft: "20px" }}>
          <TimeSelecter
            disabled={true}
            startTime={teamStartTime}
            onClick={handleClick("teamStartTime")}
          />

          <div>~</div>
          <TimeSelecter
            disabled={true}
            startTime={teamEndTime}
            onClick={handleClick("teamEndTime")}
          />
        </TimeContainer>
      </FlexContainer>

      <div>팀 정보 입력</div>

      <FlexContainer>
        <TypeSelect
          reservationType={reservationType}
          setReservationType={setReservationType}
        />
        <div style={{ marginLeft: "20px", display: "flex" }}>
          <InputName
            placeholder="팀명 입력"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onBlur={() => setTeamName(teamName.trim())}
          />
          <InputName
            placeholder="팀장 학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            onBlur={() => setStudentId(studentId.trim())}
          />
        </div>
        <ConfirmButton onClick={onClickConfirmReservation}>확인</ConfirmButton>
      </FlexContainer>

      <div
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "center",
          color: "#555",
          marginTop: "15px",
        }}
      >
        예약을 완료하려면 화면 하단의 ‘저장’ 버튼을 반드시 눌러주세요
      </div>
    </Container>
  );
};

export default AddInputs;

const Container = styled.div`
  background-color: #ececec;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputName = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 130px;
  height: 30px;
  padding-left: 7px;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
  border: 1px solid #ccc;
  margin-left: 15px;
  cursor: pointer;
`;
