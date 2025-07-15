import { InstrumentInfo } from "../../../data/user";
import useIsMobile from "../../mobile/useIsMobile";
import { Button } from "./styles/Button";
import {
  MidContainer,
  TypeContainer,
  ButtonContainer,
} from "./styles/Containers";

interface ButtonsContainerProps {
  team: boolean;
  individual: boolean;
  instruments: InstrumentInfo;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickInstrument: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
  team,
  individual,
  instruments,
  onClick,
  onClickInstrument,
}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <MidContainer>
        <ButtonContainer>
          <TypeContainer>유형</TypeContainer>
          <Button
            isActive={team}
            isMobile={isMobile}
            onClick={onClick}
            data-action="team"
          >
            팀
          </Button>
          <Button
            isActive={individual}
            isMobile={isMobile}
            onClick={onClick}
            data-action="individual"
          >
            개인
          </Button>
        </ButtonContainer>
        {(team || individual) && (
          <>
            <ButtonContainer>
              <TypeContainer>악기</TypeContainer>
              <Button
                isActive={instruments["guitar"]}
                disabled={team}
                isMobile={isMobile}
                value="guitar"
                onClick={onClickInstrument}
              >
                기타
              </Button>
              <Button
                isActive={instruments["vocal"]}
                disabled={team}
                isMobile={isMobile}
                value="vocal"
                onClick={onClickInstrument}
              >
                보컬
              </Button>
              <Button
                isActive={instruments["bass"]}
                disabled={team}
                isMobile={isMobile}
                value="bass"
                onClick={onClickInstrument}
              >
                베이스
              </Button>
              <Button
                isActive={instruments["drum"]}
                disabled={team}
                isMobile={isMobile}
                value="drum"
                onClick={onClickInstrument}
              >
                드럼
              </Button>
              <Button
                isActive={instruments["keyboard"]}
                disabled={team}
                isMobile={isMobile}
                value="keyboard"
                onClick={onClickInstrument}
              >
                키보드
              </Button>
            </ButtonContainer>
          </>
        )}
      </MidContainer>
    </>
  );
};
export default ButtonsContainer;
