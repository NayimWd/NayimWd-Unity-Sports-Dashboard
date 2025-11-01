import { ArrowLeft } from "lucide-react"
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import cn from "./cn";

interface BackButtonProps {
  text?: string;
  link?: string;
  children?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const baseClasses = "inline-flex w-auto max-w-fit items-center justify-center gap-2 text-font text-base font-semibold rounded-md py-2 px-4 bg-surface hover:bg-subSurface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted disabled:opacity-50 cursor-pointer";

const BackButton = ({ text = "Back", link, icon = <ArrowLeft size={18} stroke="currentColor" />, children, onClick, className }: BackButtonProps) => {

  const content = (
    <span className="flex items-center gap-2">
      {icon}
      {children ?? <span>{text}</span>}
    </span>
  );

  if (link) {
    return (
      <Link to={link} className={cn(baseClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, className)}>
      {content}
    </button>
  )
}

export default BackButton;