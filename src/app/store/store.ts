import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../../features/api/apiSlice";
import themeReducer from "../../features/theme/themeSlice";
import authReducer from "../../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    auth: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
