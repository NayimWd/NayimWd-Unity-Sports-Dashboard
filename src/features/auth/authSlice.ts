import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";

export interface authState {
  user: IUser | null;
  isAuthenticated: boolean;
  authLoaded: boolean;
}

const initialState: authState = {
  user: null,
  isAuthenticated: false,
  authLoaded: false,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearCredenTials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthLoaded: (state, action: PayloadAction<boolean>) => {
      state.authLoaded = action.payload;
    },
  },
});

export const { setCredentials, clearCredenTials, setAuthLoaded } = authslice.actions;
export default authslice.reducer;
