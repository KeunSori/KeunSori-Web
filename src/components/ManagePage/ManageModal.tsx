import ReactDOM from "react-dom";
import {
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
  Text,
} from "../ModalStyle.tsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const ManageModal: React.FC<ModalProps> = ({ onClose, onDelete }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text>회원을 탈퇴 처리 하시겠습니까?</Text>
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
export default ManageModal;
