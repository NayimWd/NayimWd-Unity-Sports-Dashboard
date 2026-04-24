import { IMyTeam, ITeamDetails } from "../../utils/types/teamType";
import { IAllTeams } from "../../utils/types/teamType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<
      IAllTeams,
      {
        page: number;
        limit: number;
        search: string;
        sort: string;
      }
    >({
      query: ({ page, limit, search, sort }) => {
        const queryParams = [
          `page=${page}`,
          `limit=${limit}`,
          search ? `search=${search}` : "",
          sort ? `sort=${sort}` : "",
        ]
          .filter(Boolean)
          .join("&");
        return { url: `team/all_teams?${queryParams}`, method: "GET" };
      },
      transformResponse: (response: ApiResponse<any>): IAllTeams => {
        const { teams, currentPage, totalPages, totalTeams } = response.data;

        return {
          totalTeams,
          teams,
          pagination: {
            currentPage,
            totalPages,
            totalTeams,
          },
        };
      },
      providesTags: () => [{ type: "Team", id: "LIST" }],
    }),
    getTeamDetails: builder.query<ITeamDetails, any>({
      query: (teamId) => ({
        url: `team/details/${teamId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ITeamDetails>) => response.data,
      providesTags: (_result, _error, { teamId }) => [
        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
      ],
    }),
    getMyTeam: builder.query<IMyTeam, any>({
      query: () => ({
        url: `team/my_team`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IMyTeam>) => response.data,
      providesTags: () => [{ type: "MyTeam", id: "LIST" }],
    }),
    PlayerList: builder.query({
      query: (teamId) => ({
        url: `team/player_list/${teamId}`,
        method: "GET",
      }),
      providesTags: (_result, _args, { teamId }) => [
        { type: "PlayerList", id: teamId },
      ],
    }),
    removePlayer: builder.mutation({
      query: ({ teamId, playerId }) => ({
        url: `team/removePlayer/${teamId}`,
        method: "POST",
        body: { playerId },
      }),
      invalidatesTags: (_result, _error, { playerId, teamId }) => [
        { type: "teamPlayer", id: playerId },
        { type: "teamPlayer", id: "LIST" },

        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
        { type: "availableProfile", id: "LIST" },
      ],
    }),
    addPlayer: builder.mutation({
      query: ({ teamId, playerId }) => ({
        url: `team/addPlayers/${teamId}`,
        method: "POST",
        body: { playerId },
      }),
      invalidatesTags: (_result, _error, { playerId, teamId }) => [
        { type: "teamPlayer", id: playerId },
        { type: "teamPlayer", id: "LIST" },

        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
        { type: "availableProfile", id: "LIST" },
      ],
    }),
    makeCaptain: builder.mutation({
      query: ({ teamId, playerId }) => ({
        url: `team/makeCaptain/${teamId}`,
        method: "PATCH",
        body: { playerId },
      }),
      invalidatesTags: (_result, _error, { playerId, teamId }) => [
        { type: "teamPlayer", id: playerId },
        { type: "teamPlayer", id: "LIST" },

        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
      ],
    }),
    updateTeamName: builder.mutation({
      query: ({ teamId, teamName }) => ({
        url: `team/update_name/${teamId}`,
        method: "PATCH",
        body: teamName,
      }),
      invalidatesTags: (_result, _error, { teamId }) => [
        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
      ],
    }),
    updateTeamLogo: builder.mutation({
      query: ({ teamId, formData }) => ({
        url: `team/update_logo/${teamId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { teamId }) => [
        {
          type: "Team",
          id: teamId,
        },
        { type: "Team", id: "LIST" },
      ],
    }),
    teamSummary: builder.query({
      query: ({ teamId }) => ({
        url: `team/summary/${teamId}`,
        method: "GET",
      }),
      providesTags: (_result, _args, { teamId }) => [
        { type: "TeamSummary", id: teamId },
        { type: "TeamSummary", id: "LIST" },
      ],
    }),
    createTeam: builder.mutation({
      query: (data: FormData) => ({
        url: `team/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: () => [{ type: "Team", id: "LIST" }, {type: "MyTeam", id: "LIST"}],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamDetailsQuery,
  useGetMyTeamQuery,
  usePlayerListQuery,
  useRemovePlayerMutation,
  useAddPlayerMutation,
  useMakeCaptainMutation,
  useUpdateTeamNameMutation,
  useUpdateTeamLogoMutation,
  useTeamSummaryQuery,
  useCreateTeamMutation,
} = teamApi;
