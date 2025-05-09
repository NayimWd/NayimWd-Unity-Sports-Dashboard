import { ApiResponse, Tournament } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

export const tournamentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    latestTournament: builder.query<ApiResponse<Tournament>, void>({
      query: () => `tournament/latest`,
    }),
  }),
});

export const { useLatestTournamentQuery } = tournamentApi;
