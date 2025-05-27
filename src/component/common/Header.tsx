import ThemeSwitcher from "./ThemeSwitcher";
import { ChartNoAxesGantt, LayoutDashboard, Settings, User2 } from "lucide-react";
import Buttons from "./Buttons";
import { Link, useNavigate } from "react-router-dom";
import {  useSignOutMutation } from "../../features/auth/authApi";
import { useRef, useState } from "react";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { clearCredenTials } from "../../features/auth/authSlice";
import { ErrorToast, SuccessToast } from "../../utils/toastUtils";
import useClickOutSide from "../../hooks/useClickOutSide";
import { RootState } from "../../app/store/store";

interface HeaderProps {
  handleToggle?: () => void;
}

const Header = ({ handleToggle }: HeaderProps) => {
  // access signout from authApi
  const [signOut] = useSignOutMutation();
  // access current user
  const {user} = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const links = [
    { label: "Profile", href: "/dashboard/profile", icon: <User2 size={14} /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings size={14} /> },
  ]


  // logout function 
  const handleLogout = async () => {
    try {
      await signOut({}).unwrap()
      dispatch(clearCredenTials())
      navigate("/login")
      SuccessToast({ msg: "Logout Successfull" })
    } catch (error) {
      ErrorToast({ msg: "Sign Out Failed!", position: "top-center", duration: 3000 });
    }
  }

  // close on outside click 
  useClickOutSide(dropdownRef, () => setIsOpen(false))

  return (
    <nav className="fixed w-full   top-0 z-[100] overflow-visible bg-gradient-bg border-b border-b-border  drop-shadow ">
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
            <div className="relative">
              {user?._id ? (
                <>
                  <img
                    className="size-11 rounded-full object-cover cursor-pointer hover:outline outline-primary"
                    src={user.photo}
                    alt="User Avatar"
                    onClick={() => setIsOpen(!isOpen)}
                    loading="lazy"
                  />
                  <div ref={dropdownRef}>
                    <ProfileDropdown
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      user={user}
                      onLogout={handleLogout}
                      links={links}
                    />
                  </div>
                </>
              ) : (
                <Link to="/login">
                  <Buttons className="rounded" size="md">
                    Login
                  </Buttons>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
