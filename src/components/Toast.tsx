import styled from "@emotion/styled";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export type ToastType =
  | "success"
  | "error"
  | "info";

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  console.log("message", message);

  return (
    <ToastBox type={type}>
      <WarningIcon type={type}>!</WarningIcon>
      {message}
    </ToastBox>
  );
};

export default Toast;

const ToastBox = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: fixed;
  top: 2rem;
  padding: 0.75rem 1.25rem;
  background-color: ${({ type }) =>
    type === "success"
      ? "#FFC9274D"
      : type === "error"
      ? "#FF61274D"
      : "#2196f3"};
  font-size: 1.5rem;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const WarningIcon = styled.div<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) =>
    type === "success"
      ? "#FFC927"
      : type === "error"
      ? "#FF6127"
      : "#2196f3"};
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
`;
