import { ApiResponse, ISummary } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const summaryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<ApiResponse<ISummary>, void>({
            query: () => ({
                url: "report/summary"
            }),
            transformResponse: (response: ApiResponse<ISummary>) => response
        })
    })
})

export const {useGetSummaryQuery} = summaryApi;