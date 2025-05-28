import { cva } from "class-variance-authority";
import { forwardRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import cn from "../../../utils/cn";
import { LogOut } from "lucide-react";

interface LinkItems {
  label: string;
  icon?: ReactNode;
  href?: string;
  onclick?: () => void;
};

interface User {
  _id?: string;
  name: string;
  email?: string;
  photo?: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  links: LinkItems[];
  onLogout: () => void;
  className?: string;
}

const ProfileDropdown = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ isOpen, user, links, onLogout, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dropdownStyle({ open: isOpen }), className, "z-[200]")}
        role="menu"
        aria-hidden={!isOpen}

      >
        {/* User info */}
        <div className="p-4 border-b border-inputBorder">
          <p className="text-sm font-medium text-font">{user.name}</p>
          <p className="text-xs text-subtext">Signed in</p>
        </div>

        {/* Link Items */}
        <div className="px-1 py-2">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.href ?? "#"}
              className="block w-full px-4 py-2 text-sm text-foreground hover:bg-subSurface rounded transition"
            >
              <div className="flex items-center justify-between text-subtext">
                <span>{link.label}</span>
                {link.icon && <span>{link.icon}</span>}
              </div>
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between text-left px-4 py-2 text-sm text-toastErrorText hover:bg-red-200 rounded transition"
          >
            Logout <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }
);

export default ProfileDropdown;

const dropdownStyle = cva(
  "absolute right-0 mt-2 w-48 bg-bg border border-subBorder rounded shadow-xl z-50 transform transition-all duration-200 ease-in-out origin-top",
  {
    variants: {
      open: {
        true: "opacity-100 scale-100 translate-y-0 pointer-events-auto",
        false: "opacity-0 scale-95 -translate-y-2 pointer-events-none",
      },
    },
  }
);