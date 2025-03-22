import React from "react";
import ThemeSwitcher from "./ThemeSwitcher"
import { ChartNoAxesGantt , LayoutDashboard } from 'lucide-react';

interface HeaderProps {
    handleToggle: () => void
}

const Header: React.FC<HeaderProps> = ({handleToggle}) => {
  return (
    <nav className="w-full  fixed top-0 z-50 overflow-x-hidden bg-surface border-b border-b-border opacity-90 shadow ">
        <div className="p-3 md:p-4 lg:p-5 opacity-100">
            <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
                <button className="mr-2 shadow-sm bg-bg dark:shadow-xl xs:mr-3 text-font inline-flex items-center focus:outline focus:outline-surface p-2 rounded-md sm:hidden">
                <ChartNoAxesGantt  onClick={handleToggle} className='h-8 w-10 text-black dark:text-white'/>
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