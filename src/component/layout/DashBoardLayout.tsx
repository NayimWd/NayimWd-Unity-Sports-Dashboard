import React, { useEffect } from "react";
import Header from "../common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { ThemeType } from "../../utils/types";
import useToggle from "../../hooks/useToggle";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoardLayout: React.FC = () => {
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
    <div className="min-h-screen bg-bg flex flex-col">
      {/* navbar */}
      <Header handleToggle={setIsOpen} />
      {/* main content wrapper */}
      <div className="flex flex-1 overflow-hidden relative">
        {/*sidebar*/}
        <div
          className={`
        fixed md:static z-30 md:z-auto top-0 left-0 h-full 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-0"}
        overflow-hidden
      `}
        >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {/* Backdrop for mobile when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-opacity-50 md:hidden z-20"
            onClick={() => setIsOpen(false)}
          />
        )}
        {/* main content */}
        <main className={` ml-0 md:ml-64 mt-16 sm:mt-[74px] xl:mt-20 flex-1 p-3 overflow-y-auto`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
