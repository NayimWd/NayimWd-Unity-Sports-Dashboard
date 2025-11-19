import { IAllTeams } from "../../utils/types/teamType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<IAllTeams, void>({
      query: () => ({
        url: "team/all_teams",
        method: "GET",
      }),
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
  }),
});

export const { useGetTeamsQuery } = teamApi;
