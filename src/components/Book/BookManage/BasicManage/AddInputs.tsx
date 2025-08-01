import styled from "@emotion/styled";
import TypeSelect from "./TypeSelect";
import TimeSelecter from "../TimeSelecter";
import { useAtom } from "jotai";
import { TeamWeek } from "@/store/weekData";
import {
  studentIdAtom,
  teamEndTimeAtom,
  teamNameAtom,
  teamStartTimeAtom,
} from "@/store/teamData";

interface AddInputsProps {
  teamDate?: TeamWeek;
  isActive: boolean;
  setTeamStartTime: (val: string) => void;
  setTeamEndTime: (val: string) => void;
}

const AddInputs = ({
  isActive,
  setTeamStartTime,
  setTeamEndTime,
}: AddInputsProps) => {
  const [teamName, setTeamName] = useAtom(teamNameAtom);
  const [studentId, setStudentId] = useAtom(studentIdAtom);
  const [teamStartTime] = useAtom(teamStartTimeAtom);
  const [teamEndTime] = useAtom(teamEndTimeAtom);

  const handleClick =
    (timeType: "teamStartTime" | "teamEndTime") =>
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      const value = e.currentTarget.getAttribute("value");
      if (value) {
        if (timeType === "teamStartTime") {
          setTeamStartTime(value);
        } else {
          setTeamEndTime(value);
        }
      }
    };

  return (
    <Container>
      <TypeSelect />
      <InputName
        placeholder="팀명 입력"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <InputName
        placeholder="팀장 학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
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
