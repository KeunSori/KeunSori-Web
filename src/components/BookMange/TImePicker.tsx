import styled from "@emotion/styled";
import React, { useRef, useState, useEffect } from "react";

const TimePicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let hour = 10; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const value = e.currentTarget.getAttribute("value");
    if (value) {
      setSelectedTime(value);
    }
    setIsOpened(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current && // dropdownRef가 정의되어 있고
        !dropdownRef.current.contains(event.target as Node) // 클릭한 대상이 드롭다운 내부가 아닌 경우
      ) {
        setIsOpened(false); // 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // 클릭 이벤트 추가
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // 이벤트 정리
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "200px",
      }}
    >
      <SelectedButton onClick={() => setIsOpened(!isOpened)}>
        {selectedTime}
      </SelectedButton>

      {isOpened && (
        <Dropbox ref={dropdownRef}>
          {generateTimeOptions().map((time) => (
            <Button key={time} value={time} onClick={(e) => handleClick(e)}>
              {time}
            </Button>
          ))}
        </Dropbox>
      )}
    </div>
  );
};
const Dropbox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100px;
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 1;
  gap: 5px;
  top: 30px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
`;
const SelectedButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 100px;
  height: 30px;
  text-align: left;
  margin-left: 5px;
  margin-bottom: 5px;
  background-color: #fff;
  &:hover {
    color: #ffaa00;
    font-weight: 500;
  }
`;
export default TimePicker;
