import ReactDOM from "react-dom";
import {
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
  Text,
} from "../../ModalStyle";

interface ReservatiionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const ReservationModal: React.FC<ReservatiionModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text>아래의 예약이 맞는지 확인해주세요</Text>
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
