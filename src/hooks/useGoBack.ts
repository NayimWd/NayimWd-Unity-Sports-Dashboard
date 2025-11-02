import { useNavigate } from "react-router-dom";

export function useGoBack(defaultPath = "/dashboard") {
  const navigate = useNavigate();

  return (path?: string) => {
    if (window.history.state && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(path || defaultPath);
    }
  };
}
