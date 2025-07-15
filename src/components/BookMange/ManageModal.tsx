import ReactDOM from "react-dom";
import {
  Text,
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
} from "../ModalStyle";
interface ManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStore: () => void;
}
const ManageModal: React.FC<ManageModalProps> = ({ onClose, onStore }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text>기존 예약이 삭제될 수 있습니다</Text>
        <ButtonWrapper>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={onStore} isDelete={true}>
            진짜 저장하기
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default ManageModal;
