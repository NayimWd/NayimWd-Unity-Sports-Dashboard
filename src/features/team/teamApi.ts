import { IAllTeams } from "../../utils/types/teamType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<IAllTeams, 
    {
      page: number; limit: number; search: string; sort: string
    }>({
      query: ({page, limit, search, sort}) => {
        const queryParams = [
          `page=${page}`,
          `limit=${limit}`,
          search ? `search=${search}` : "",
          sort ? `sort=${sort}` : ""
        ]
        .filter(Boolean)
        .join("&")
       return { url: `team/all_teams?${queryParams}`,
        method: "GET",
        }
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
    getTeamDetails: builder.query({
      query: () => ({
        url: ""
      })
    })
  }),
});

export const { useGetTeamsQuery } = teamApi;
