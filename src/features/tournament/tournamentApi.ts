import { apiSlice } from "../api/apiSlice";

export const tournamentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        latestTournament: builder.query({
            query: () =>`tournament/latest`
        }),
    }),
});

export const {useLatestTournamentQuery} = tournamentApi;