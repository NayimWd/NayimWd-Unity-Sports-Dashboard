import { ILatestTournamentResponse } from "../../utils/types/tournamentResultType";
import { ApiResponse, ISummary } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const summaryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<ApiResponse<ISummary>, void>({
            query: () => ({
                url: "report/summary",
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<ISummary>) => response,
            providesTags: () => [
                {type: "Summary", id: "LIST"}
            ]
        }),
        getLatestResult: builder.query<ApiResponse<ILatestTournamentResponse>, void>({
            query: () => ({
                url: `report/latestResult`,
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<ILatestTournamentResponse>) => response,
            providesTags: () => [
                {type: "LatestResult", id: "LIST"}
            ]
        })
    })
})

export const {useGetSummaryQuery, useGetLatestResultQuery} = summaryApi;