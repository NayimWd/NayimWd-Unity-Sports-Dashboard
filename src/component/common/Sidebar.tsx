import React, { useRef } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { navLinks } from "../../assets/constant/link";
import SidebarItem from "./sidebarItem";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {

  const sidebarRef = useRef<HTMLElement>(null!);

  useClickOutSide(sidebarRef, () => setIsOpen(false));

  const userRole =  "admin";




  return (
    <aside
      ref={sidebarRef}
      className={`bg-surface  fixed top-[72px] sm:top-16 md:top-[72px] lg:top-16 left-0 h-full w-64 overflow-x-hidden  border-r border-border md:translate-x-0 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 pt-8 pb-20 overflow-y-scroll scrollbar-hide">
        {
          navLinks[userRole].map((link, index)=>(
            <SidebarItem key={index} link={link}/>
          ))
        }
      </div>
    </aside>
  );
};

export default Sidebar;
