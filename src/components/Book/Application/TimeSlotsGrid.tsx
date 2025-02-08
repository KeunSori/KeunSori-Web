import { css } from "@emotion/css";
import { TimeInfo } from "../Time";
import { TimeSlots } from "./styles/Times";
import { SlotButton } from "./styles/Button";
import useIsMobile from "../../mobile/useIsMobile";
interface TimeSlot {
  time: string;
  available: boolean;
}
interface TimeSlotsGridProps {
  slots: TimeSlot[];
  startTime: TimeInfo | null;
  endTime: TimeInfo | null;
  onSlotsClick: (index: number, time: string, available: boolean) => void;
}
export const TimeSlotsGrid: React.FC<TimeSlotsGridProps> = ({
  slots,
  startTime,
  endTime,
  onSlotsClick,
}) => {
  const isMobile = useIsMobile();
  return (
    <TimeSlots>
      {slots.map((slot, index) => (
        <div key={index}>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <div
              className={css`
                height: 10px;
              `}
            >
              {index % 2 === 0 && index / 2 + 10}{" "}
            </div>
            <SlotButton
              key={index}
              available={slot.available}
              isMobile={isMobile}
              selected={
                (!!startTime &&
                  !!endTime &&
                  index >= startTime.index &&
                  index <= endTime.index) ||
                startTime?.index === index
              }
              onClick={() => onSlotsClick(index, slot.time, slot.available)}
            ></SlotButton>
          </div>
        </div>
      ))}
    </TimeSlots>
  );
};
