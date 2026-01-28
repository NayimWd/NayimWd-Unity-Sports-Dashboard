import { MatchListData, TournamentMatch } from "../../utils/types/matchTypes";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const matchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatch: builder.query<MatchListData, any>({
      query: ({ tournamentId }) => ({
        url: `match/all/${tournamentId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<MatchListData>) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result?.match.map((m) => ({
                type: "Match" as const,
                id: m._id,
              })),
              { type: "Match", id: "LIST" },
            ]
          : [{ type: "Match", id: "LIST" }],
    }),
    getMatchDetails: builder.query({
      query: ( matchId ) => ({
        url: `/match/details/${matchId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMatchQuery, useGetMatchDetailsQuery } = matchApi;
