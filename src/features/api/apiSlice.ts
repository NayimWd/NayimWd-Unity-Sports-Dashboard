import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";


const baseQuery: BaseQueryFn = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL as string,
    credentials: "include",
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (_builder) => ({}),
})