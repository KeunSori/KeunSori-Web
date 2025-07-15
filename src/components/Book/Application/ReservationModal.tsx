import ReactDOM from "react-dom";
import {
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
  Text,
  DetailText,
} from "../../ModalStyle";
import { transInstrument } from "../../../utils/instrumentUtils";

interface ReservatiionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  reservationInfo: {
    date: Date | null;
    startTime: string | undefined;
    endTime: string;
    instrument: string;
    team: boolean;
  };
}
const ReservationModal: React.FC<ReservatiionModalProps> = ({
  onClose,
  onSubmit,
  reservationInfo,
}) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text>아래의 예약이 맞는지 확인해주세요</Text>
        <DetailText>
          날짜:{" "}
          {reservationInfo.date
            ? `${reservationInfo.date.getFullYear()}년 ${
                reservationInfo.date.getMonth() + 1
              }월 ${reservationInfo.date.getDate()}일`
            : "날짜 정보 없음"}
        </DetailText>
        <DetailText>
          시간:{" "}
          {reservationInfo.startTime
            ? `${reservationInfo.startTime} ~ ${reservationInfo.endTime}`
            : "시간 정보 없음"}
        </DetailText>
        <DetailText margin={true}>
          악기:{" "}
          {reservationInfo.instrument === "ALL"
            ? "합주"
            : transInstrument(reservationInfo.instrument)}
        </DetailText>
        <ButtonWrapper>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={onSubmit} isDelete={true}>
            확인
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default ReservationModal;
