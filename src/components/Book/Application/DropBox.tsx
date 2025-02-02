import styled from "@emotion/styled";
import React, { useRef, useState, useEffect } from "react";

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

    document.addEventListener("mousedown", handleOutsideClick); // 클릭 이벤트 추가
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // 이벤트 정리
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

    document.addEventListener("mousedown", handleOutsideClick); // 클릭 이벤트 추가
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // 이벤트 정리
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
const ArrowButton = styled.div`
  font-size: 10px;
  color: #000;
  background-color: transparent;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  max-width: 200px;
`;
interface DropboxProps {
  isOpened: boolean;
}
const Dropbox = styled.div<DropboxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100px;
  max-height: ${({ isOpened }) => (isOpened ? "200px" : "0px")};
  padding: ${({ isOpened }) => (isOpened ? "10px" : "0px")};
  transition: max-height, padding 0.3s ease-in-out;
  border-radius: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
  gap: 5px;
  top: 30px;

  background-color: #fff;

  ${({ isOpened }) =>
    isOpened &&
    `
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  `}
`;
const SelectedButton = styled.button`
  color: rgb(0, 0, 0);
  min-width: 100px;
  white-space: nowrap;
  height: 30px;
  margin-right: 5px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Button = styled.button`
  width: 100%;
  height: 30px;
  text-align: left;
  padding: 8px;
  background-color: #fff;
  color: black;
  &:hover {
    color: #ffaa00;
    font-weight: 500;
  }
`;
export { InstrumentDropBox, TeamDropBox };
