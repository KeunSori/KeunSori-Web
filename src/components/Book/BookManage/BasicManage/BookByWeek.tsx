import styled from "@emotion/styled";
// import { useAtom } from "jotai";
import { Week } from "@/store/weekData.ts";
import BookByWeekNotion from "./BookByWeekNotion";
import PlusButton from "../../../../../public/image/plus-black.svg";
import MinusButton from "../../../../../public/image/minus-black.svg";

import { useState } from "react";
import AddInputs from "./AddInputs";

interface DayNotionProps {
  date: Week;
  isActive: boolean;
}

const BookByWeek: React.FC<DayNotionProps> = ({ isActive }) => {
  // const [weekData, setWeekData] = useAtom(weekDataAtom);
  const [showInputs, setShowInputs] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const onClickConfirm = () => {
    setShowItems(true);
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
            <AddInputs />
            <ConfirmButton onClick={onClickConfirm}>확인</ConfirmButton>
          </FlexStyle>
          {showItems && (
            <div style={{ marginTop: "25px" }}>
              <BookByWeekNotion />
              <BookByWeekNotion />
              <BookByWeekNotion />
            </div>
          )}
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
const ConfirmButton = styled.div`
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
