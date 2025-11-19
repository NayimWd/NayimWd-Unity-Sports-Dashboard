import { ITeamDetails } from "../../utils/types/teamType";
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
    }),
    getTeamDetails: builder.query<ITeamDetails, string>({
      query: (teamId) => ({
        url: `team/details/${teamId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ITeamDetails>) => response.data,
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamDetailsQuery } = teamApi;
