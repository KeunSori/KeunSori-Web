import React, { useRef, useState, useEffect } from "react";
import { Button, Dropbox, SelectedButton } from "./DropBoxStyle";
interface TimePickerProps {
  startTime?: string;
  endTime?: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const TimePicker: React.FC<TimePickerProps> = ({
  startTime,
  endTime,
  disabled,
  onClick,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>(
    startTime || endTime || "10:00"
  );
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let hour = 10; hour <= 23; hour++) {
      for (let minute = 0; minute < (hour === 23 ? 1 : 60); minute += 30) {
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
    setSelectedTime(startTime || endTime || "10:00");
  }, [startTime, endTime]);
  useEffect(() => {
    console.log(startTime);
    console.log(endTime);
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
      <SelectedButton
        onClick={() => setIsOpened(!isOpened)}
        disabled={!disabled}
      >
        {selectedTime}
      </SelectedButton>

      <Dropbox ref={dropdownRef} isOpened={isOpened}>
        {generateTimeOptions().map((time) => (
          <Button
            key={time}
            value={time}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onClick(e);
              handleClick(e);
            }}
          >
            {time}
          </Button>
        ))}
      </Dropbox>
    </div>
  );
};

export default TimePicker;
