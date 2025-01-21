import styled from "@emotion/styled";
import { FaWindowClose } from "react-icons/fa";
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <p>예약이 완료되었습니다.</p>
      <CloseButton onClick={onClose}>
        <FaWindowClose />
      </CloseButton>
    </ModalContainer>
  );
};
export default SuccessModal;
interface ModalContainerProps {
  isOpen: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35%;
  left: 40%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
  width: 300px;
  height: 120px;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 13px;
  padding: 0px;
  background-color: transparent;
  cursor: pointer;
`;
