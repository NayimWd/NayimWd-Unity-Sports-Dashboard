import { IPlayerDetails } from "../../utils/types/playerType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const playerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerDetails: builder.query<IPlayerDetails, string>({
      query: (playerId) => ({
        url: `team/player_details/${playerId}`,
        method: "GET",
      }),
      // transform api response
     transformResponse: (response: ApiResponse< IPlayerDetails>) : IPlayerDetails => {
        return response.data;
     },
      // tag for cache and revalidation
      providesTags: (result, _error, playerId) => 
        result 
            ? [
                {
                    type: "Player" as const, id: playerId,
                },
                {
                    type: "Player" as const, id: "LIST"
                }
            ]
            : 
            [
                {
                    type: "Player" as const, id: "LIST"
                }
            ]
    }),
  }),
});

export const { useGetPlayerDetailsQuery } = playerApi;
