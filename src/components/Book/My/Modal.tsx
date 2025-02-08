import ReactDOM from "react-dom";
import {
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
  Text,
} from "../../ModalStyle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const Modal: React.FC<ModalProps> = ({ onClose, onDelete }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text>예약을 취소하시겠습니까?</Text>
        <ButtonWrapper>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={onDelete} isDelete={true}>
            확인
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default Modal;
