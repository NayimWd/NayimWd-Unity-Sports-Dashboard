import React, { ReactNode, useEffect } from "react";
import Header from "../common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { ThemeType } from "../../utils/types";
import useToggle from "../../hooks/useToggle";
import Sidebar from "../common/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashBoardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // theme
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const applyTheme = (mode: ThemeType) => {
      document.documentElement.classList.remove("light", "dark");

      if (mode === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(mode);
      }
    };

    applyTheme(theme);
  }, [theme]);

  // toggle
  const [isOpen, setIsOpen] = useToggle({ defaultValue: false });

  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar */}
      <Header handleToggle={setIsOpen} />
      {/* main content wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/*sidebar*/}
        <div className={`${isOpen ? "w-64" : "w-0"}`}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {/* main content */}
        <main className="flex-1 p-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
