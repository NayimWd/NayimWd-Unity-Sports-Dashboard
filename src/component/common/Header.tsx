import ThemeSwitcher from "./ThemeSwitcher";
import { ChartNoAxesGantt, LayoutDashboard } from "lucide-react";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import { useCurrentUserQuery } from "../../features/auth/authApi";

interface HeaderProps {
  handleToggle?: () => void;
}

const Header = ({ handleToggle }: HeaderProps) => {
  // access current user
  const {data: user} = useCurrentUserQuery();

  return (
    <nav className="fixed w-full   top-0 z-[100] overflow-hidden bg-gradient-bg border-b border-b-border  drop-shadow ">
      <div className="p-3 md:p-4 lg:p-5 opacity-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button className="mr-2 shadow bg-bg dark:shadow-xl xs:mr-3 text-font inline-flex items-center focus:outline focus:outline-surface p-2 rounded-md md:hidden">
              <ChartNoAxesGantt
                onClick={handleToggle}
                className="h-8 w-10 text-black dark:text-white"
                aria-label="Toggle Menu"
              />
            </button>
            <div className="flex items-center me-2 md:me-24">
              <LayoutDashboard className="hidden md:block md:h-10 md:w-10 me-3 text-xl text-primary" />
              <span className="hidden sm:block self-center tracking-wider  uppercase text-[clamp(1.25rem,2vw,2.6rem)] text-primary font-bold whitespace-nowrap font-inter">
                Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
          <ThemeSwitcher />
            <div>
              {
                user?._id ?
                <div>
                  <img className="size-11 rounded-full object-center object-cover outline hover:outline-primary cursor-pointer"
                       src={user.photo}
                       alt="User Photo"
                       loading="lazy"
                  />
                </div>
                :
              <Link to="/login">
              <Buttons className="rounded" size="md">
                Login
              </Buttons>
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
