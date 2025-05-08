import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
