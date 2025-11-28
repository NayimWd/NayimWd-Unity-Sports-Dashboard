import {
  ITournamentData,
  ITournaments,
} from "../../utils/types/tournamentTypes";
import { ApiResponse, Tournament } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const tournamentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    latestTournament: builder.query<ApiResponse<Tournament>, void>({
      query: () => `tournament/latest`,
    }),
    getAllTournament: builder.query<ApiResponse<ITournaments>, string | void>({
      query: (status) => {
        const param = status ? `status=${status}` : "";

        return { url: `tournament/status?${param}`, method: "GET" };
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
        url: `tournament/tournamentDetails/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ITournamentData>) => response,
      providesTags: (_result, _error, tournamentId) => [
        { type: "Tournament", id: tournamentId },
      ],
    }),
    createTournament: builder.mutation({
      query: (data) => ({
        url: `tournament/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Tournament", id: "LIST" }],
    }),
    updateTournamentDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `tournament/update_details/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    updateTournamentDate: builder.mutation({
      query: ({ id, data }) => ({
        url: `tournament/update_date/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    updateTournamentPhoto: builder.mutation({
      query: ({ id, data }) => ({
        url: `tournament/update_photo/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    updateTournamentStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `tournament/update_status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
        { type: "Tournament", id: "LIST" },
      ],
    }),
    createTournamentResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `tournament/create_result/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tournament", id: id },
      ],
    }),
  }),
});

export const {
  useLatestTournamentQuery,
  useGetAllTournamentQuery,
  useGetTournamentDetailsQuery,
  useCreateTournamentMutation,
  useUpdateTournamentDetailsMutation,
  useUpdateTournamentDateMutation,
  useUpdateTournamentPhotoMutation,
  useUpdateTournamentStatusMutation,
  useCreateTournamentResultMutation
} = tournamentApi;
