import {  ScheduleListPayload } from "../../utils/types/scheduleType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const scheduleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       getSchedult: builder.query<ScheduleListPayload, any>({
        query: ({tournamentId}) => ({
            url: `/schedule/all/${tournamentId}`,
            method: "GET"
        }),
        transformResponse: (response: ApiResponse<ScheduleListPayload>) => response.data,
        providesTags: (_result, _error, tournamentId)=> [
            {type: "Schedule", id: tournamentId},
            {type: "Schedule", id: "LIST"},
        ]
       }),
       createSchedule: builder.mutation(({
        query: ({tournamentId, data}) => ({
            url:   `/schedule/create/${tournamentId}`,
            method: "POST",
            body: data
        }),
        invalidatesTags: (_result, _error, {tournamentId})=>[
            {type: "Schedule", id: tournamentId},
            {type: "Schedule", id: "List"},

            {type: "Match", id: "LIST"},

            {type: "Venue", id: "LIST"}
        ]
       })),

    })
});

export const {useGetSchedultQuery, useCreateScheduleMutation} = scheduleApi;