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
  }),
});

export const {
  useLatestTournamentQuery,
  useGetAllTournamentQuery,
  useGetTournamentDetailsQuery,
} = tournamentApi;
