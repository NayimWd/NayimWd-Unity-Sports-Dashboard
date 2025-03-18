import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";


const baseQuery: BaseQueryFn = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    credentials: "include",
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (_builder) => ({}),
})