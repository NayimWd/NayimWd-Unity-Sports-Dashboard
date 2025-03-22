import { useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store/store";
import { useEffect } from "react";
import { ThemeType } from "./utils/types";
import Header from "./component/common/Header";
import Sidebar from "./component/common/Sidebar";
import useToggle from "./hooks/useToggle";
import Layout from "./component/layout/Layout";
import Dashboard from "./pages/Dashboard";

function App() {
  // theme
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const applyTheme = (mode: ThemeType) => {
      document.documentElement.classList.remove("light", "dark");

      if (mode === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(mode);
      }
    };

    applyTheme(theme);
  }, [theme]);

  // toggle function
  const [isOpen, setIsOpen] = useToggle({ defaultValue: false });

  return (
    <main className="overflow-x-hidden w-full h-screen bg-bg">
      <Header handleToggle={setIsOpen} />
      <Layout>
        <div className={`${isOpen ? "w-64" : "w-0"}`}>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div
          className={`${
            isOpen ? "sm:ml-64" : ""
          } mt-[72px] sm:mt-16 md:mt-[72px] mt:top-20 p-5 sm:ml-64`}
        >
          <Dashboard/>
        </div>
      </Layout>
    </main>
  );
}

export default App;
