import styled from "@emotion/styled";
// import { useAtom } from "jotai";
import { TeamWeek, teamWeekDataAtom, Week } from "@/store/weekData.ts";
import BookByWeekNotion from "./BookByWeekNotion";
import PlusButton from "../../../../../public/image/plus-black.svg";
import MinusButton from "../../../../../public/image/minus-black.svg";

import { useState } from "react";
import AddInputs from "./AddInputs";
import { useAtom } from "jotai";
import { studentIdAtom, teamNameAtom, typeAtom } from "@/store/teamData";

interface DayNotionProps {
  date: Week;
}

const BookByWeek: React.FC<DayNotionProps> = ({ date }) => {
  const [isActive] = useState<boolean>(date.isActive);
  const [showInputs, setShowInputs] = useState(false);

  const [teamWeekItems, setTeamWeekItems] = useAtom(teamWeekDataAtom);

  // inputs
  const [type] = useAtom(typeAtom);
  const [teamName] = useAtom(teamNameAtom);
  const [studentId] = useAtom(studentIdAtom);
  const [teamStartTime, setTeamStartTime] = useState("10:00");
  const [teamEndTime, setTeamEndTime] = useState("23:00");

  console.log(teamWeekItems);
  const onClickConfirm = () => {
    if (!teamName || !teamStartTime || !teamEndTime || !studentId) {
      alert("모든 값을 입력하세요");
      return;
    }

    const newItem: TeamWeek = {
      dayOfWeekNum: date.dayOfWeekNum,
      teamName,
      teamStartTime,
      teamEndTime,
      type,
      studentId,
    };
    setTeamWeekItems((prev) => [...prev, newItem]);
  };

  const handleDeleteItem = (teamNameToDelete: string, dayOfWeekNum: number) => {
    const updated = teamWeekItems.filter(
      (item) =>
        item.teamName !== teamNameToDelete || item.dayOfWeekNum !== dayOfWeekNum
    );
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
              isActive={isActive}
              teamDate={undefined}
              setTeamStartTime={setTeamStartTime}
              setTeamEndTime={setTeamEndTime}
            />
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
          </FlexStyle>

          {teamWeekItems
            .filter((item) => item.dayOfWeekNum === date.dayOfWeekNum)
            .map((item, idx) => (
              <BookByWeekNotion
                key={idx}
                dayOfWeekNum={item.dayOfWeekNum}
                teamName={item.teamName}
                teamStartTime={item.teamStartTime}
                teamEndTime={item.teamEndTime}
                handleDeleteItem={handleDeleteItem}
              />
            ))}
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
