import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../utils/types";

// create theme interface by theme type
interface ITheme {
  mode: ThemeType;
}

// theme ditector function, if no preferance, detect system, and preferance theme
const getInitialTheme = (): ThemeType => {
  // get existing theme from local storege
  const existingTheme = localStorage.getItem("theme") as ThemeType | null;

  if (existingTheme) return existingTheme;

  // user preferance theme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState: ITheme = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
