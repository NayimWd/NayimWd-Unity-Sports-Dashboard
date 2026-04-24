import { ApiResponse, PointTableData } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const pointTableApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPointTable: builder.query<ApiResponse<PointTableData>, any>({
            query: (tournamentId) => ({
                url: `pointTable/get/${tournamentId}`,
                method: "GET"
            }),
             providesTags: (_result, _args, {tournamentId}) => [
                { type: "PointTable", id: tournamentId },
                { type: "PointTable", id: "LIST" },
             ]  
        }),
        
    })
});
 

export const {useGetPointTableQuery, useLazyGetPointTableQuery} = pointTableApi;