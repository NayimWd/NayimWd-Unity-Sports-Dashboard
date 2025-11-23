import { ApiResponse } from "../../utils/types/types";
import { IVenue } from "../../utils/types/venueType";
import { apiSlice } from "../api/apiSlice";

const venueApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVenue: builder.query<ApiResponse<IVenue>, void>({
            query: () => ({
                url: `venue/all`,
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<IVenue>) => response,
        })
    })
});

export const {useGetVenueQuery} = venueApi;