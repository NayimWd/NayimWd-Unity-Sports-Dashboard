import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { useEffect } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeWrapper;
