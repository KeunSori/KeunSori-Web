import React, { useRef, useState, useEffect } from "react";
import {
  ArrowButton,
  Button,
  Container,
  Dropbox,
  SelectedButton,
} from "./DropBoxStyles";

const instruments: string[] = [
  "악기",
  "보컬",
  "기타",
  "베이스",
  "키보드",
  "드럼",
];
const teams: string[] = ["신청 유형", "팀", "개인"];
interface DropBoxProps {
  onClick: (value: string) => void;
}
const InstrumentDropBox: React.FC<DropBoxProps> = ({ onClick }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedInstrument, setSelectedInstrument] = useState<string>("악기");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.getAttribute("value");
    if (value) {
      setSelectedInstrument(value);
    }
    setIsOpened(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      <SelectedButton onClick={() => setIsOpened(!isOpened)}>
        {selectedInstrument}
        <ArrowButton>{isOpened ? "▲" : "▼"}</ArrowButton>
      </SelectedButton>

      <Dropbox isOpened={isOpened}>
        {instruments.map((instrument) => (
          <Button
            key={instrument}
            value={instrument}
            onClick={(e) => {
              handleClick(e);
              onClick(instrument);
            }}
          >
            {instrument}
          </Button>
        ))}
      </Dropbox>
    </Container>
  );
};

const TeamDropBox: React.FC<DropBoxProps> = ({ onClick }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedTeam, setSelectedTeam] = useState<string>("신청 유형");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.getAttribute("value");
    if (value) {
      setSelectedTeam(value);
    }
    setIsOpened(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      <SelectedButton onClick={() => setIsOpened(!isOpened)}>
        {selectedTeam}
        <ArrowButton>{isOpened ? "▲" : "▼"}</ArrowButton>
      </SelectedButton>

      <Dropbox isOpened={isOpened}>
        {teams.map((team) => (
          <Button
            key={team}
            value={team}
            onClick={(e) => {
              handleClick(e);
              onClick(team);
            }}
          >
            {team}
          </Button>
        ))}
      </Dropbox>
    </Container>
  );
};

export { InstrumentDropBox, TeamDropBox };
