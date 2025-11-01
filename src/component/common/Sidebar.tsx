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
      className={`
    bg-gradientN-bg fixed mt-6 top-0 left-0 z-40 h-full w-64 border-r border-border transition-transform duration-300 ease-in-out shadow-xl md:shadow-sm backdrop-blur-sm md:backdrop-blur-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
    >
      <div className="relative h-full px-2 pt-20 pb-48 overflow-y-scroll scrollbar-hide">
        {navLinks[userRole].map((link, index) => (
          <SidebarItem key={index} link={link} />
        ))}
      </div>

      <div className="absolute bottom-4 left-0 w-full py-2 rounded-md shadow-md">
        <SidebarProfile />
      </div>
    </aside>
  );
};

export default Sidebar;
