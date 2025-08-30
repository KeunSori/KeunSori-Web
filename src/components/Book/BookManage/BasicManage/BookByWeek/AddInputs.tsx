import styled from "@emotion/styled";
import { TeamWeek } from "@/store/weekData";
import { ReservationType } from "@/utils/mapper/regularReservation/convertResType";
import TypeSelect from "./TypeSelect";
import TimeSelecter from "../../TimeSelecter";
import { ReservationSessionKor } from "@/utils/mapper/regularReservation/convertSession";
import { TimeString } from "@/store/Time";

interface AddInputsProps {
  teamDate?: TeamWeek;
  isActive: boolean;
  reservationType: ReservationType | ReservationSessionKor;
  setReservationType: (type: ReservationType | ReservationSessionKor) => void;
  teamName: string;
  setTeamName: (val: string) => void;
  studentId: string;
  setStudentId: (val: string) => void;
  teamStartTime: TimeString;
  teamEndTime: TimeString;
  setTeamStartTime: (val: TimeString) => void;
  setTeamEndTime: (val: TimeString) => void;
}

const AddInputs = ({
  isActive,
  reservationType,
  setReservationType,
  teamName,
  setTeamName,
  studentId,
  setStudentId,
  teamStartTime,
  teamEndTime,
  setTeamStartTime,
  setTeamEndTime,
}: AddInputsProps) => {
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

  return (
    <Container>
      <TypeSelect
        reservationType={reservationType}
        setReservationType={setReservationType}
      />
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
      <TimeContainer>
        <TimeSelecter
          disabled={isActive}
          startTime={teamStartTime}
          onClick={handleClick("teamStartTime")}
        />

        <div>~</div>
        <TimeSelecter
          disabled={isActive}
          startTime={teamEndTime}
          onClick={handleClick("teamEndTime")}
        />
      </TimeContainer>
    </Container>
  );
};

export default AddInputs;

const Container = styled.div`
  display: flex;
  background-color: #ececec;
  padding: 5px;
  border-radius: 10px;
`;

const InputName = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 130px;
  height: 30px;
  margin-left: 10px;
  padding-left: 7px;
`;

const TimeContainer = styled.div`
  margin-left: 20px;
  display: flex;
  height: 100%;
  gap: 10px;
  align-items: center;
`;
