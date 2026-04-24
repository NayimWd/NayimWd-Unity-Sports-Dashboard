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
  const userRole: UserRole = (user?.role && ["admin", "manager", "player", "umpire"].includes(user.role))
    ? user.role as UserRole
    : "player";

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 z-40 h-full w-64
        bg-surface border-r border-border
        flex flex-col
        transition-transform duration-300 ease-in-out
        shadow-xl md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:mt-14
      `}
    >
      {/* Role badge */}
      <div className="px-4 py-3 border-b border-border">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-70" />
          {userRole} panel
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 mb-32 scrollbar-hide">
        {navLinks[userRole].map((link, index) => (
          <SidebarItem key={index} link={link} />
        ))}
      </nav>

      {/* Footer */}
      <div className="relative">
      <SidebarProfile />
      </div>
    </aside>
  );
};

export default Sidebar;
