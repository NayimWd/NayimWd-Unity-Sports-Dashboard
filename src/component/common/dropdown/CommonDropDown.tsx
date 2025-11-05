import { X } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import cn from "../../../utils/cn";
import { cva } from "class-variance-authority";

interface LinkItems {
    label: string;
    icon?: ReactNode;
    href?: string;
    onclick?: () => void;
};

interface DropdownMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: LinkItems[];
    className?: string;
}

const CommonDropDown = forwardRef<HTMLDivElement, DropdownMenuProps>(
    ({ isOpen, links, className, onClose }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    dropdownStyle({ open: isOpen }),
                    "z-[50]",
                    "bg-bg border border-muted rounded-lg shadow-lg backdrop-blur-md w-56",
                    className
                )}
                role="menu"
                aria-hidden={!isOpen}
            >
                {/* Close Button */}
                <div className="flex justify-between text-font p-2 border-b">
                    <p>Menu</p>
                    <button
                        onClick={onClose}
                        className="text-subtext hover:text-foreground bg-subSurface hover:bg-surface rounded-full p-1 transition-all duration-150"
                        aria-label="Close dropdown"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Link Items */}
                <div className="space-y-1 px-2 pb-2 mb-1.5 mt-3">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            to={link.href ?? "#"}
                            onClick={link.onclick}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm text-subtext hover:text-foreground hover:bg-subSurface rounded-md transition-all duration-150"
                        >
                            <span>{link.label}</span>
                            {link.icon && <span className="text-muted-foreground">{link.icon}</span>}
                        </Link>
                    ))}
                </div>
            </div>
        );
    });

export default CommonDropDown;


const dropdownStyle = cva(
    "absolute right-0 mt-2 origin-top-right transform transition-all duration-200 ease-in-out",
    {
        variants: {
            open: {
                true: "opacity-100 scale-100 translate-y-0 pointer-events-auto",
                false: "opacity-0 scale-95 -translate-y-2 pointer-events-none",
            },
        },
    }
);