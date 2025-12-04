import { apiSlice } from "../api/apiSlice";

const matchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMatch: builder.query({
            query: ({tournamentId}) => ({
                url: `match/all/${tournamentId}`,
                method: "GET"
            }),
        }),
    }),
});


export const {useGetMatchQuery} = matchApi;