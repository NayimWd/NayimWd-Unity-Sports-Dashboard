import { createContext, ReactNode, useContext, useRef, useState } from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";
import cn from "../../../utils/cn";
import { Link } from "react-router-dom";

interface DropDownContextProps {
  open: boolean;
  toggle: () => void;
  close: () => void;
  align?: "left" | "right";
  onSelect?: (value: string | number) => void;
}

// dropdown context
const DropDownContext = createContext<DropDownContextProps | null>(null);

// use context
function useDropdownContext() {
  const context = useContext(DropDownContext);
  if (!context) throw new Error("Dropdown children must be used within <Dropdown>");
  return context;
}

interface DropDownProps {
  children: ReactNode;
  align?: "left" | "right";
  onSelect?: (value: any) => void;
  className?: string;
}

const Dropdown = ({ children, align = "left", onSelect, className }: DropDownProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev: boolean) => !prev);
  const close = () => setOpen(false);

  // close on outside click
  useClickOutSide(ref, () => close());

  return (
    <DropDownContext.Provider value={{ open, toggle, align, close, onSelect }}>
      <div ref={ref} className={cn(className, "relative inline-block text-left text-font ")}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

interface TriggerProps {
  children: ReactNode;
  className?: string;
}

function DropdownTrigger({ children, className }: TriggerProps) {
  const { toggle, open } = useDropdownContext();

  return (
    <button
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={toggle}
      className={cn("px-3 py-1 bg-surface border border-border rounded-md flex items-center justify-center gap-2 z-0", className)}
    >
      {children}
    </button>
  );
}

interface MenuProps {
  children: ReactNode;
  className?: string;
}

function DropdownMenu({ children, className }: MenuProps) {
  const { open, align } = useDropdownContext();

  if (!open) return null;

  return (
    <div
      role="menu"
      tabIndex={-1}
      data-open={open}
      className={cn(
        "absolute z-[10] top-7  mt-2 min-w-[160px] rounded-md border border-border bg-surface shadow-lg animate-in fade-in-80 zoom-in-95 duration-150 p-2 backdrop-blur-md",
        align === "right" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  value?: string | number;
  className?: string;
}

function DropdownItem({ children, onClick, href, value, className }: DropdownItemProps) {
  const { close, onSelect } = useDropdownContext();

  const handleClick = () => {
    if (value !== undefined) onSelect?.(value);
    onClick?.();
    close();
  };

  if (href) {
    return (
      <Link
        to={href}
        role="menuitem"
        tabIndex={0}
        onClick={handleClick}
        className={cn(
          "px-2 py-1 text-sm hover:bg-subtle rounded w-full text-left transition-colors hover:bg-bg flex justify-left items-center gap-2",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      className={cn(
        "flex justify-left items-center gap-1 px-2 py-1 text-sm hover:bg-subtle rounded w-full text-left transition-colors hover:bg-bg",
        className
      )}
    >
      {children}
    </button>
  );
}

function DropdownSeparator() {
  return <div className="border-t border-border my-1" />;
}

interface FooterProps {
  children: ReactNode;
  className?: string;
}

function DropdownFooter({ children, className }: FooterProps) {
  return <div className={cn("px-3 py-2 text-sm opacity-75", className)}>{children}</div>;
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Footer = DropdownFooter;

export default Dropdown;
