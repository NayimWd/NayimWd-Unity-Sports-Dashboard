import ThemeSwitcher from "./ThemeSwitcher";
import { ChartNoAxesGantt, Settings, User2 } from "lucide-react";
import Buttons from "./Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../../features/auth/authApi";
import { useRef, useState } from "react";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { clearCredenTials } from "../../features/auth/authSlice";
import { ErrorToast, SuccessToast } from "../../utils/toastUtils";
import useClickOutSide from "../../hooks/useClickOutSide";
import { RootState } from "../../app/store/store";
import { apiSlice } from "../../features/api/apiSlice";

interface HeaderProps {
  handleToggle?: () => void;
}

const Header = ({ handleToggle }: HeaderProps) => {
  // access signout from authApi
  const [signOut] = useSignOutMutation();
  // access current user
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { label: "Account", href: "/dashboard/myAccount", icon: <User2 size={14} /> },
    { label: "Profile", href: "/dashboard/profile", icon: <Settings size={14} /> },
  ]


  // logout function 
  const handleLogout = async () => {
    try {
      await signOut({}).unwrap()
      dispatch(clearCredenTials())
      dispatch(apiSlice.util.resetApiState())
      navigate("/login")
      SuccessToast({ msg: "Logout Successfull" })
    } catch (error) {
      ErrorToast({ msg: "Sign Out Failed!", position: "top-center", duration: 3000 });
      
    }
  }

  // close on outside click 
  useClickOutSide(dropdownRef, () => setIsOpen(false))

  return (
    <nav className="sticky top-0 z-50 w-full py-4 h-16 bg-surface border-b border-border flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">

          {/* ── Left ── */}
          <div className="flex items-center gap-2.5">
            {/* Mobile menu toggle */}
            <button
              onClick={handleToggle}
              className="md:hidden w-[34px] h-[34px] rounded-lg border border-border bg-subSurface
                         flex items-center justify-center text-subtext
                         hover:bg-bg hover:border-inputBorder transition-colors"
              aria-label="Toggle menu"
            >
              <ChartNoAxesGantt size={16} />
            </button>

            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="w-[30px] h-[30px] rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 1.5l2 4 4.5.7-3.25 3.1.75 4.4L7.5 11.5l-4 2.2.75-4.4L1 6.2l4.5-.7z"
                    fill="white" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-base md:text-lg font-medium text-font leading-tight tracking-tight">
                  Unity Sports
                </p>
                <p className="text-[12px] text-muted leading-tight">Club Management</p>
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            <div className="w-px h-5 bg-border mx-1" />

            {user?._id ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(prev => !prev)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg border border-border
                             bg-subSurface hover:bg-bg hover:border-inputBorder
                             transition-colors duration-150"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-7 h-7 rounded-md object-cover flex-shrink-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center
                                    text-[11px] font-medium text-white flex-shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-medium text-font leading-tight">{user.name}</p>
                    <p className="text-[10px] text-muted leading-tight capitalize">{user.role ?? "Member"}</p>
                  </div>
                  <svg className="text-muted ml-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <ProfileDropdown
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  user={user}
                  onLogout={handleLogout}
                  links={links}
                />
              </div>
            ) : (
              <Link to="/login">
                <Buttons size="sm">Login</Buttons>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
