import ReactDOM from "react-dom";
import {
  Text,
  Button,
  ButtonWrapper,
  ModalWrapper,
  Overlay,
} from "@/styles/ModalStyle";
import { memo } from "react";
interface ManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  questionText: string;
}
const ManageModal: React.FC<ManageModalProps> = ({
  onClose,
  onAccept,
  questionText,
}) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <Text style={{ whiteSpace: "pre-line" }}>{questionText}</Text>
        <ButtonWrapper>
          <Button onClick={onClose}>아니요</Button>
          <Button onClick={onAccept} isDelete={true}>
            네
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
};
export default memo(ManageModal);
