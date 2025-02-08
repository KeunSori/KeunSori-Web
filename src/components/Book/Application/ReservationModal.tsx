import styled from "@emotion/styled";
import ReactDOM from "react-dom";

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
const Text = styled.div`
  text-align: center;
  font-weight: 400;
  margin: 15px;
`;
const ButtonWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  max-width: 300px;
  width: 60%;
`;
const Button = styled.button<{ isDelete?: boolean }>`
  cursor: pointer;
  width: 50%;
  font-size: 15px;
  font-weight: 400;
  border: ${(props) =>
    props.isDelete ? "1px solid rgb(146, 146, 146);" : "none"};
  background-color: ${(props) => (props.isDelete ? "white" : "#FEDC75")};
  border-radius: 5px;
  padding: 10px;
  margin: 0 5px;
`;
