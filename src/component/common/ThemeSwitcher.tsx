import { useDispatch } from "react-redux"
// import { RootState } from "../../app/store/store";
import { ThemeType } from "../../utils/types";
import { setTheme } from "../../features/theme/themeSlice";

const ThemeSwitcher = () => {

    const dispatch = useDispatch();

    // const theme = useSelector((state: RootState)=> state.theme.mode);

    const handleThemeChange = (newTheme: ThemeType) => {
        dispatch(setTheme(newTheme));
      };

  return (
    <div className="flex gap-2">
    <button onClick={() => handleThemeChange("light")} className="p-2 bg-gradient-secondary rounded">
      Light
    </button>
    <button onClick={() => handleThemeChange("dark")} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
      Dark
    </button>
    <button onClick={() => handleThemeChange("system")} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
      System
    </button>
  </div>
  )
}

export default ThemeSwitcher