import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";

interface authState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: authState = {
  user: null,
  isAuthenticated: false,
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
  },
});

export const { setCredentials, clearCredenTials } = authslice.actions;
export default authslice.reducer;
