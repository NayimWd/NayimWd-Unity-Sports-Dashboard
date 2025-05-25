import React, { useRef } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { navLinks } from "../../assets/constant/link";
import SidebarItem from "./sidebarItem";
import { LogOut } from "lucide-react";
import { useSignOutMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredenTials } from "../../features/auth/authSlice";
import { ErrorToast, SuccessToast } from "../../utils/toastUtils";


interface SidebarProps {
  isOpen: boolean;
  setIsOpen: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  // access signout from authApi
  const [signOut] = useSignOutMutation();
  // access current user

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLElement>(null!);

  useClickOutSide(sidebarRef, () => setIsOpen(false));

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


  const userRole = "admin";

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
      <div className="absolute bottom-20 bg-surface h-10 w-full flex items-center justify-center text-primary shadow">
        <div onClick={handleLogout} className="flex gap-2 justify-center items-center cursor-pointer p-2">
          <LogOut size={16} />
          <p>SIGN OUT</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
