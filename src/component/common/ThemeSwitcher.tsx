import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "../../app/store/store";
import { ThemeType } from "../../utils/types";
import { setTheme } from "../../features/theme/themeSlice";
import { Moon, Sun } from 'lucide-react';
import { RootState } from "../../app/store/store";

const ThemeSwitcher = () => {

    const dispatch = useDispatch();

    const theme = useSelector((state: RootState)=> state.theme.mode);

    const handleThemeChange = (newTheme: ThemeType) => {
        dispatch(setTheme(newTheme));
      };

  return (
    <div className="">
      { theme === "dark" ? <button onClick={()=>handleThemeChange("light")} className="w-12 h-10 rounded-md  p-1 bg-bg flex justify-center items-center shadow hover:bg-card">
        <Sun className="text-font"/>
      </button>
      :
      <button onClick={()=>handleThemeChange("dark")} className="w-12 h-10 rounded-md  p-1 bg-bg flex justify-center items-center shadow-sm hover:bg-card">
        <Moon />
      </button>}
      
  </div>
  )
}

export default ThemeSwitcher