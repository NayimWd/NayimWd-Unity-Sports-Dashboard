import { ReactNode } from "react";
import cn from "../../utils/cn";

interface pageLayoutProps {
    children: ReactNode;
    className?: string;
};

const PageLayout = ({children, className}: pageLayoutProps) => {
  return (
    <main className={cn("min-h-screen flex flex-col", className)}>
        {children}
    </main>
  )
}

export default PageLayout;