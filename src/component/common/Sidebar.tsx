import React, { useRef } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef<HTMLElement>(null!);

  useClickOutSide(sidebarRef, () => setIsOpen(false));

  return (
    <aside
      ref={sidebarRef}
      className={`bg-surface opacity-90 fixed top-[72px] sm:top-16 md:top-[72px] lg:top-20 left-0 h-screen w-64 overflow-x-hidden py-5 border-r border-border sm:translate-x-0 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 overflow-y-auto"></div>
    </aside>
  );
};

export default Sidebar;
