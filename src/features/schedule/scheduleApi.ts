import {  ScheduleListPayload } from "../../utils/types/scheduleType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const scheduleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getSchedult: builder.query<ScheduleListPayload, any>({
        query: ({tournamentId}) => ({
            url: `schedule/all/${tournamentId}`,
            method: "GET"
        }),
        transformResponse: (response: ApiResponse<ScheduleListPayload>) => response.data,
        
       })
    })
});

export const {useGetSchedultQuery} = scheduleApi;