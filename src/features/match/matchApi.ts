import {
  IMatchDetailsResponse,
  MatchListData,
} from "../../utils/types/matchTypes";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const matchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatch: builder.query<MatchListData, any>({
      query: ({ tournamentId }) => ({
        url: `/match/all/${tournamentId}`,
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
      query: (matchId) => ({
        url: `/match/details/${matchId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IMatchDetailsResponse>) =>
        response.data,
      providesTags: (_result, _args, { matchId }) => [
        { type: "Match", id: matchId },
        { type: "Match", id: "LIST" },
      ],
    }),
    matchOverview: builder.query({
      query: ({ tournamentId }) => ({
        url: `/match/overview/${tournamentId}`,
        method: "GET",
      }),
      providesTags: (_result, _args, { matchId }) => [
        { type: "Match", id: matchId },
        { type: "Match", id: "LIST" },
      ],
    }),
    matchUmpireList: builder.query({
      query: ({ matchId }) => ({
        url: `/match/umpires/${matchId}`,
        method: "GET",
      }),
      providesTags: () => [
        { type: "Umpire", id: "LIST" },
        { type: "Match", id: "LIST" },
        { type: "Schedule", id: "List" },
      ],
    }),
    updateUmpire: builder.mutation({
      query: ({ tournamentId, matchId, data }) => ({
        url: `/match/update_umpires/${tournamentId}/${matchId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ matchId }) => [
        { type: "Match", id: matchId },
        { type: "Match", id: "LIST" },
      ],
    }),
    matchTeams: builder.query({
      query: ({ matchId }) => ({
        url: `/match/teamsOfMatch/${matchId}`,
        method: "GET",
      }),
    }),
    getMatchPlayer: builder.query({
      query: ({ teamId }) => ({
        url: `/match/players/${teamId}`,
        method: "GET",
      }),
    }),
    createMatch: builder.mutation({
      query: ({ tournamentId, data }) => ({
        url: `/match/create/${tournamentId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ matchId }) => [
        { type: "Match", id: matchId },
        { type: "Match", id: "LIST" },
        { type: "Schedule", id: "List" },
      ],
    }),
    createMatchResult: builder.mutation({
      query: ({ tournamentId, matchId, data }) => ({
        url: `/match/createResult/${tournamentId}/${matchId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({ matchId, tournamentId }) => [
        // invalidate match
        { type: "Match", id: matchId },

        // tournament
        { type: "Tournament", id: tournamentId },

        // match result
        { type: "matchResult", id: matchId },

        // point table
        { type: "PointTable", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMatchQuery,
  useGetMatchDetailsQuery,
  useMatchTeamsQuery,
  useMatchOverviewQuery,
  useMatchUmpireListQuery,
  useUpdateUmpireMutation,
  useCreateMatchMutation,
  useGetMatchPlayerQuery,
  useLazyGetMatchPlayerQuery,
  useCreateMatchResultMutation,
} = matchApi;
