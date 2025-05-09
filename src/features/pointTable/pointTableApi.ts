import { apiSlice } from "../api/apiSlice";

export const pointTableApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPointTable: builder.query({
            query: (tournamentId: string) => `pointTable/get/${tournamentId}`
        })
    })
});


export const {useGetPointTableQuery, useLazyGetPointTableQuery} = pointTableApi;