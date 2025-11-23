import { apiSlice } from "../api/apiSlice";

const playerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlayerDetails: builder.query({
            query: (playerId) => ({
                url: `team/player_details/${playerId}`,
                method: "GET"
            })
        })
    })
});


export const {useGetPlayerDetailsQuery} = playerApi;