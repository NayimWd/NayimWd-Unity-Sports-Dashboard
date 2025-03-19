import { useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store/store";
import { useEffect, useState } from "react";
import { ThemeType } from "./utils/types";
import Header from "./component/common/Header";
import Sidebar from "./component/common/Sidebar";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev)=> !prev)
  };



  return (
    <main className="overflow-x-hidden w-full h-[100vw] bg-bg">
      <Header handleToggle={handleToggle}/>
      <Sidebar  isOpen={isOpen}/>
    </main>
  );
}

export default App;
