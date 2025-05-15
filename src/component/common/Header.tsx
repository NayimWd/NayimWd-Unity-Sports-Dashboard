import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ChartNoAxesGantt, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  handleToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleToggle }) => {
  return (
    <nav className="fixed w-full   top-0 z-50 overflow-hidden bg-gradient-bg border-b border-b-border  drop-shadow ">
      <div className="p-3 md:p-4 lg:p-5 opacity-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button className="mr-2 shadow bg-bg dark:shadow-xl xs:mr-3 text-font inline-flex items-center focus:outline focus:outline-surface p-2 rounded-md md:hidden">
              <ChartNoAxesGantt
                onClick={handleToggle}
                className="h-8 w-10 text-black dark:text-white"
              />
            </button>
            <div className="flex items-center me-2 md:me-24">
              <LayoutDashboard className="hidden md:block md:h-10 md:w-10 me-3 text-xl text-primary" />
              <span className="self-center tracking-wider  uppercase text-[clamp(1.25rem,2vw,2.6rem)] text-primary font-bold whitespace-nowrap font-inter">
                Dashboard
              </span>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Header;
