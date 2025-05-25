import React, { useRef } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { navLinks } from "../../assets/constant/link";
import SidebarItem from "./sidebarItem";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import SidebarProfile from "./profile/SidebarProfile";



interface SidebarProps {
  isOpen: boolean;
  setIsOpen: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {

  // access current user
  const { data: user } = useCurrentUserQuery();

  const sidebarRef = useRef<HTMLElement>(null!);

  useClickOutSide(sidebarRef, () => setIsOpen(false));



  type UserRole = keyof typeof navLinks;
  const userRole: UserRole = (user?.role && ["admin", "manager", "player"].includes(user.role))
    ? user.role as UserRole
    : "player";

  return (
    <aside
      ref={sidebarRef}
      className={` bg-gradientN-bg  fixed mt-16 lg:mt-20  z-40 h-full w-64 overflow-x-hidden  border-r border-border md:translate-x-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="relative h-full px-2 pt-5 pb-48 overflow-y-scroll scrollbar-hide">
        {navLinks[userRole].map((link, index) => (
          <SidebarItem key={index} link={link} />
        ))}
      </div>
      <div className="w-full absolute -bottom-[2px] left-0 bg-bg shadow">
          <SidebarProfile/>
      </div>
    </aside>
  );
};

export default Sidebar;
