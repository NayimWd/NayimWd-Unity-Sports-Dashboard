import React, { useEffect } from "react";
import Header from "../common/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { ThemeType } from "../../utils/types/types";
import useToggle from "../../hooks/useToggle";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../utils/scrollToTop";

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
      <Header handleToggle={setIsOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 md:hidden z-20"
            onClick={() => setIsOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto md:pl-64">
          <div className="container">
            <ScrollToTop />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
