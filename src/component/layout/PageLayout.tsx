import { ReactNode } from "react";
import cn from "../../utils/cn";

interface pageLayoutProps {
    children: ReactNode;
    className?: string;
};

const PageLayout = ({children, className}: pageLayoutProps) => {
  return (
    <main className={cn("min-h-screen flex flex-col py-4 sm:py-6 xl:py-7", className)}>
        {children}
    </main>
  )
}

export default PageLayout;