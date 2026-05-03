import {
  ITournamentData,
  ITournamentFinalResult,
  ITournaments,
} from "../../utils/types/tournamentTypes";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const tournamentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    latestTournament: builder.query({
      query: () => ({
        url: `/tournament/latest`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: () => [
        { type: "LatestTournament", id: "LIST" },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    getAllTournament: builder.query<ApiResponse<ITournaments>, string | void>({
      query: (status) => {
        const param = status ? `status=${status}` : "";

        return { url: `/tournament/status?${param}`, method: "GET" };
      },
      transformResponse: (response: ApiResponse<ITournaments>) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.data.tournaments.map((t) => ({
                type: "Tournament" as const,
                id: t._id,
              })),
              { type: "Tournament", id: "LIST" },
            ]
          : [{ type: "Tournament", id: "LIST" }],
    }),
    getTournamentDetails: builder.query<ApiResponse<ITournamentData>, string>({
      query: (tournamentId) => ({
        url: `/tournament/tournamentDetails/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ITournamentData>) => response,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Tournament", id: tournamentId },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    getTournamentResult: builder.query<
      ApiResponse<ITournamentFinalResult>,
      string
    >({
      query: (tournamentId) => ({
        url: `/tournament/results/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ITournamentFinalResult>) =>
        response,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Tournament", id: tournamentId },
      ],
    }),
    searchTournament: builder.query({
      query: () => ({
        url: "/tournament/search",
        method: "GET",
      }),
      providesTags: () => [{ type: "Tournament", id: "LIST" }],
    }),
    createTournament: builder.mutation({
      query: (data) => ({
        url: `/tournament/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Tournament", id: "LIST" }],
    }),
    updateTournamentDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/update_details/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
    updateTournamentDate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/update_date/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
    updateTournamentPhoto: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/update_photo/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
    updateTournamentStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/update_status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
    createTournamentResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tournament/create_result/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
    approvedTeam: builder.query({
      query: ({ tournamentId }) => ({
        url: `//tournament/approved_teams/${tournamentId}`,
        method: "GET",
      }),
      providesTags: (_result, _args, { tournamentId }) => [
        { type: "ApprovedTeam", id: tournamentId },
      ],
    }),
    upcomingTournament: builder.query({
      query: () => ({
        url: `/tournament/upcoming`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLatestTournamentQuery,
  useGetAllTournamentQuery,
  useGetTournamentDetailsQuery,
  useGetTournamentResultQuery,
  useCreateTournamentMutation,
  useUpdateTournamentDetailsMutation,
  useUpdateTournamentDateMutation,
  useUpdateTournamentPhotoMutation,
  useUpdateTournamentStatusMutation,
  useCreateTournamentResultMutation,
  useSearchTournamentQuery,
  useApprovedTeamQuery,
  useUpcomingTournamentQuery,
} = tournamentApi;
