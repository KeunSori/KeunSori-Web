import { useEffect }from "react";
import ReactDOM from "react-dom/client";

interface ToastProps {
  message: string;
  duration: number;
}

const Toast = ({ message, duration }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("toast-root");
      if (el) el.innerHTML = "";
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow">
        {message}
      </div>
    </div>
  );
};

// 전역에서 호출할 함수
export function showToast(message: string, duration = 3000) {
  let container = document.getElementById("toast-root");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-root";
    document.body.appendChild(container);
  }

  const root = ReactDOM.createRoot(container);
  root.render(<Toast message={message} duration={duration} />);
}
