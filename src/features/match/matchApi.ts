import { IMatchDetailsResponse, MatchListData } from "../../utils/types/matchTypes";
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
      query: ( matchId ) => ({
        url: `/match/details/${matchId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IMatchDetailsResponse>) => response.data,
      providesTags: (_result, _args, {matchId}) =>[
        {type: "Match", id: matchId},
        {type: "Match", id: "LIST"},
      ]
    }),
    matchOverview: builder.query({
      query: ({tournamentId}) => ({
        url: `/match/overview/${tournamentId}`,
        method: "GET"
      }),
      providesTags: (_result, _args, {matchId}) =>[
        {type: "Match", id: matchId},
        {type: "Match", id: "LIST"},
      ]
    }),
    matchUmpireList: builder.query({
      query: ({matchId})=> ({
        url: `/match/umpires/${matchId}`,
        method: "GET"
      }),
      providesTags: () =>[
        {type: "Umpire", id: "LIST"},
        {type: "Match", id: "LIST"},
        { type: "Schedule", id: "List" },
      ]
    }),
    updateUmpire: builder.mutation({
      query: ({tournamentId, matchId, data}) => ({
        url: `/match/update_umpires/${tournamentId}/${matchId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ({matchId}) => [
        {type: "Match", id: matchId},
        {type: "Match", id: "LIST"}
      ]
    }),
    createMatch: builder.mutation({
      query: ({tournamentId, data}) => ({
        url: `/match/create/${tournamentId}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ({matchId}) => [
        {type: "Match", id: matchId},
        {type: "Match", id: "LIST"},
        { type: "Schedule", id: "List" },
      ]
    })
  }),
});

export const { useGetMatchQuery, useGetMatchDetailsQuery, useMatchOverviewQuery, useMatchUmpireListQuery, useUpdateUmpireMutation, useCreateMatchMutation } = matchApi;
