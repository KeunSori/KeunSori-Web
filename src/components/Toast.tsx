import styled from "@emotion/styled";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <ToastBox type={type}>{message}</ToastBox>;
};

export default Toast;

const ToastBox = styled.div<{ type: string }>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background-color: ${({ type }) =>
    type === "success"
      ? "#4caf50"
      : type === "error"
      ? "#f44336"
      : "#2196f3"};
  color: white;
  border-radius: 8px;
  font-size: 0.95rem;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
