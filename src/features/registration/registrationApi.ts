import {  IApplicationDetails, IRegistrations } from "../../utils/types/applicationType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const registrationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegisterApplication : builder.query<ApiResponse<IRegistrations>, any>({
            query: ({id, status}) => ({
                url: `tournamentRegister/get_all/${id}?status=${status}`,
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<IRegistrations>) => response,
            providesTags: ["Registration"]
        }),
        getApplicationDetails: builder.query<ApiResponse<IApplicationDetails>, string>({
            query: (id) => ({
                url: `tournamentRegister/application/details/${id}`,
                method: "GET"
            })
        })
    }),
});

export const {useGetRegisterApplicationQuery, useGetApplicationDetailsQuery} = registrationApi;