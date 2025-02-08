import { useEffect, useState } from "react";
import Reservation from "./Reservation/Reservation.tsx";
import { useAtom } from "jotai";
import {
  endTimeAtom,
  startTimeAtom,
  instrument,
  printEndTimeAtom,
  monthDataAtom,
} from "../Time.ts";
import { Value } from "react-calendar/src/shared/types.js";
import { ReservationButton } from "./styles/Button.tsx";
import authApi from "../../../api/Instance/authApi.ts";
import { InstrumentInfo } from "../../../data/user.ts";
import OutContainer from "../OutContainer.tsx";
import useIsMobile from "../../mobile/useIsMobile.tsx";
import { SelectedTime } from "./styles/Times.tsx";
import { Container, InContainer } from "./styles/Containers.tsx";
import { useNavigate } from "react-router-dom";
import ReservationModal from "./ReservationModal.tsx";
import TimeContainer from "./TimeContainer.tsx";
import { formatDate } from "../../../utils/dateUtils.ts";
import CalendarComponent from "./Calendar/CalendarComponent.tsx";
import ButtonsContainer from "./ButtonsComponent.tsx";

const ApplicationBook: React.FC = () => {
  const defaultInstruments: InstrumentInfo = {
    vocal: false,
    guitar: false,
    bass: false,
    keyboard: false,
    drum: false,
  };
  const isMobile = useIsMobile();
  const [team, setTeam] = useState<boolean>(false);
  const [individual, setIndividual] = useState<boolean>(false);
  const [instruments, setInstruments] =
    useState<instrument>(defaultInstruments);
  const [instrument, setInstrument] = useState<string>("");
  const [startTime] = useAtom(startTimeAtom);
  const [endTime] = useAtom(endTimeAtom);
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const [printEndTime] = useAtom(printEndTimeAtom);
  const [, setMonthData] = useAtom(monthDataAtom);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    if (date) {
      try {
        const response = await authApi.get(
          `/reservation?month=${formatDate(date)}`
        );
        setMonthData(response.data);
      } catch {
        console.log("error");
      }
    } else {
      try {
        const response = await authApi.get(
          `/reservation?month=${formatDate(today)}`
        );
        setMonthData(response.data);
      } catch {
        console.log("error");
      }
    }
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.dataset.action;
    if (action === "team") {
      setTeam(true);
      setIndividual(false);
      setInstruments(defaultInstruments);
      setInstrument("ALL");
    } else if (action === "individual") {
      setTeam(false);
      setIndividual(true);
    }
  };
  const onClickInstrument = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInstruments(defaultInstruments);
    const value = e.currentTarget.value as keyof instrument;
    setInstruments((prev) => ({ ...prev, [value]: !prev[value] }));
    setInstrument(value);
  };
  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) return;
    const inst = Object.keys(instruments).find(([value]) => value);
    setInstrument(inst?.toString() || "");
    try {
      await authApi.post("/reservation", {
        reservationType: team ? "TEAM" : "PERSONAL",
        reservationSession: team ? "ALL" : instrument,
        reservationDate: `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        reservationStartTime: startTime.time,
        reservationEndTime: printEndTime,
      });
      alert("예약이 완료되었습니다!");
      navigate("/book?type=my");
    } catch (e) {
      console.log(e);
      alert("다시 시도 해주세요.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);
  return (
    <>
      <OutContainer>
        <ButtonsContainer
          team={team}
          individual={individual}
          instruments={instruments}
          onClick={onClick}
          onClickInstrument={onClickInstrument}
        />
        {instruments["guitar"] ||
        instruments["vocal"] ||
        instruments["bass"] ||
        instruments["drum"] ||
        instruments["keyboard"] ||
        team ? (
          <InContainer isMobile={isMobile}>
            <Container isMobile={isMobile}>
              <CalendarComponent date={date} onDateChange={handleDateChange} />
              {isMobile && (
                <Reservation date={date} instrument={instrument} team={team} />
              )}
              <SelectedTime isMobile={isMobile}>
                <TimeContainer
                  startTime={startTime}
                  endTime={endTime}
                  date={date}
                  printEndTime={printEndTime}
                  isMobile={isMobile}
                />

                <ReservationButton
                  onClick={() => setIsModalOpen(true)}
                  isMobile={isMobile}
                  disabled={!date || !startTime || !endTime}
                >
                  예약하기
                </ReservationButton>
              </SelectedTime>
            </Container>
            {!isMobile && (
              <Reservation date={date} instrument={instrument} team={team} />
            )}
          </InContainer>
        ) : null}
        {isModalOpen && (
          <ReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </OutContainer>
    </>
  );
};
export default ApplicationBook;
