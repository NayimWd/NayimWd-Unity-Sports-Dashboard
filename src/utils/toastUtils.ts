import { toast } from "react-hot-toast";

interface ToastProps {
  msg?: string;
  position?: string | any;
  duration?: number;
}

const baseStyle = {
  fontFamily: "var(--text-font)",
  fontSize: "14px",
  borderRadius: "0.5rem",
  width: "clamp(250px, 90vw, 350px)",
  minHeight: "3.5rem",
};

export const SuccessToast = ({msg, position, duration}: ToastProps) => {
  toast.success(msg || "Success!", {
    position: position ? position : "top-center",
    duration: duration ? duration : 3000,
    style: {
      background: "var(--toastSuccessBg)",
      color: "var(--toastSuccessText)",
      ...baseStyle,
    },
  });
};

export const ErrorToast = ({msg, position, duration}: ToastProps) => {
  toast.error(msg || "Something Went Wrong!", {
    position: position ? position : "top-center",
    duration: duration ? duration : 3000,
    style: {
      background: "var(--toastErrorBg)",
      color: "var(--toastErrorText)",
      ...baseStyle,
    },
  });
};

export const LoadingToast = ({msg, position, duration}: ToastProps) => {
  return toast.loading(msg || "Loading...", {
    position: position ? position : "top-center",
    duration: duration ?? 6000,
    style: {
      background: "var(--primary)",
      color: "#fff",
      ...baseStyle,
    },
  });
};
