import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

export default Layout;
