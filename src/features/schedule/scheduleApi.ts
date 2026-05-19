import { ScheduleListPayload } from "../../utils/types/scheduleType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedult: builder.query<ScheduleListPayload, any>({
      query: ({ tournamentId }) => ({
        url: `/schedule/all/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ScheduleListPayload>) =>
        response.data,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Schedule", id: tournamentId },
        { type: "Schedule", id: "LIST" },
      ],
    }),
    createSchedule: builder.mutation({
      query: ({ tournamentId, data }) => ({
        url: `/schedule/create/${tournamentId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Schedule", id: tournamentId },
        { type: "Schedule", id: "List" },

        { type: "Match", id: "LIST" },

        { type: "Venue", id: "LIST" },
      ],
    }),
    updateScheduleTime: builder.mutation({
      query: ({ scheduleId, data }) => ({
        url: `/schedule/update_timing/${scheduleId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { scheduleId }) => [
        { type: "Schedule", id: scheduleId },
        { type: "Schedule", id: "List" },

        { type: "Match", id: "LIST" },

        { type: "Venue", id: "LIST" },
      ],
    }),
    scheduleTeam: builder.query({
        query: ({scheduleId}) => ({
            url: `/schedule/teams/${scheduleId}`,
            method: "GET",
        })
    }),
    updateScheduleTeam: builder.mutation({
        query: ({scheduleId, data}) => ({
            url:`/schedule/change_teams/${scheduleId}`,
            method: "PATCH",
            body: data
        }),
        invalidatesTags: (_result, _error, { scheduleId }) => [
        { type: "Schedule", id: scheduleId },
        { type: "Schedule", id: "List" },

        { type: "Match", id: "LIST" },

        { type: "Venue", id: "LIST" },
      ],
    }),
    updateScheduleDetails: builder.mutation({
        query: ({scheduleId, data}) => ({
            url: `/schedule/update_details/${scheduleId}`,
            method: "PATCH",
            body: data
        }),
        invalidatesTags: (_result, _error, { scheduleId }) => [
        { type: "Schedule", id: scheduleId },
        { type: "Schedule", id: "List" },

        { type: "Match", id: "LIST" },

        { type: "Venue", id: "LIST" },
      ],
    })
  }),
});

export const { useGetSchedultQuery, useCreateScheduleMutation, useUpdateScheduleTimeMutation, useScheduleTeamQuery, useUpdateScheduleTeamMutation, useUpdateScheduleDetailsMutation } = scheduleApi;
