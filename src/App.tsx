import { useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store/store";
import { useEffect } from "react";
import { ThemeType } from "./utils/types";
import ThemeSwitcher from "./component/common/ThemeSwitcher";


function App() {

  const theme = useSelector((state: RootState)=> state.theme.mode);

  useEffect(()=>{
    const applyTheme = (mode: ThemeType) => {
      document.documentElement.classList.remove("light", "dark");

      if(mode === "system"){
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(mode)
      }
    }

    applyTheme(theme)
  },[theme])

  return (
    <main>
     <ThemeSwitcher/>
      <div className="text-5xl text-font bg-card font-merriweather"> Hello  </div>
      <h1 className="text-2xl">Current Theme: {theme}</h1>
      </main>
  );
}

export default App;
