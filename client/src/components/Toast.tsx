import "./Toast.css";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="toast">
      <p>{message}</p>
      <button className="toast-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast; 