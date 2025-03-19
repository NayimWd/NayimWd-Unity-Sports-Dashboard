import React from "react";
import ThemeSwitcher from "./ThemeSwitcher"
import { Menu, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
    handleToggle: () => void
}

const Header: React.FC<HeaderProps> = ({handleToggle}) => {
  return (
    <nav className="w-full h-20 fixed top-0 z-50 overflow-x-hidden bg-sidebar border-b border-b-border opacity-90 shadow">
        <div className="p-3 md:p-4 lg:p-5 opacity-100">
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
                <button className="mr-2 xs:mr-3 text-font inline-flex items-center p-2 rounded-lg hover:bg-bg focus:bg-bg focus:ring-1 focus:ring-font sm:hidden">
                <Menu onClick={handleToggle} className='h-8 w-8'/>
                </button>
                <div className='flex items-center me-2 md:me-24'>
                    <LayoutDashboard className='md:h-10 md:w-10 me-3 text-xl text-primary'/>
                    <span className='self-center text-xl text-font font-semibold sm:text-2xl whitespace-nowrap'>
                        Dashboard
                    </span>
                </div>
            </div>
                <ThemeSwitcher/>
            </div>
        </div>
    </nav>
  )
}

export default Header