import { apiSlice } from "../api/apiSlice";

const inningsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInnings: builder.mutation({
      query: ({ tournamentId, matchId, data }) => ({
        url: `/innings/create/${tournamentId}/${matchId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ({matchId}) => [
        {type: "Innings", id: matchId},
        {type: "matchResult", id: matchId}
      ] 
    }),
  }),
});


export const {useCreateInningsMutation} = inningsApi;
