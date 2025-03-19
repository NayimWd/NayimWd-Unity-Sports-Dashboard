import React from "react";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen}) => {
  return (
    <aside className={`bg-sidebar backdrop-opacity-90 fixed top-20 left-0 h-screen w-64 overflow-x-hidden py-5 border-r border-border sm:translate-x-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

    <div className="h-full px-3 overflow-y-auto">

    </div>
    
    </aside>
  );
};

export default Sidebar;

