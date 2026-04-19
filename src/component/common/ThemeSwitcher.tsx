import { useDispatch, useSelector } from "react-redux"
import { ThemeType } from "../../utils/types/types";
import { setTheme } from "../../features/theme/themeSlice";
import { Moon, Sun } from 'lucide-react';
import { RootState } from "../../app/store/store";

const ThemeSwitcher = () => {

  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleThemeChange = (newTheme: ThemeType) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <button
      onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
      className="w-[34px] h-[34px] rounded-lg border border-border bg-subSurface
                 flex items-center justify-center text-subtext
                 hover:bg-bg hover:border-inputBorder hover:text-font
                 transition-colors duration-150"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? <Sun size={15} />
        : <Moon size={15} />}
    </button>
  )
}

export default ThemeSwitcher