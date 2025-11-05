import { ApiResponse, PointTableData } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const pointTableApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPointTable: builder.query<ApiResponse<PointTableData>, string>({
            query: (tournamentId: string) => `pointTable/get/${tournamentId}`
        })
    })
});
 

export const {useGetPointTableQuery, useLazyGetPointTableQuery} = pointTableApi;