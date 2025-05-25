import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearCredenTials } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL_LOCAL as string,
  credentials: "include",
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1 try original req
  let result = await baseQuery(args, api, extraOptions);

  // 2 if token expired, try to refresh
  if (result.error && result.error.status === 401) {
    const refreshToken = await baseQuery(
      "auth/refreshToken",
      api,
      extraOptions
    );

    if (refreshToken.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredenTials());
    }
  }

  return result;
};
