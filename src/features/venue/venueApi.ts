import { ApiResponse } from "../../utils/types/types";
import { IVenue, IVenueDetails } from "../../utils/types/venueType";
import { apiSlice } from "../api/apiSlice";

const venueApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVenue: builder.query<ApiResponse<IVenue>, void>({
            query: () => ({
                url: `venue/all`,
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<IVenue>) => response,
        }),
        getVenueDetails: builder.query<ApiResponse<IVenueDetails>, string>({
            query: (venueId)=> ({
                url: `venue/details/${venueId}`,
                method: "GET"
            }),
            transformResponse: (response: ApiResponse<IVenueDetails>) => response,
        })
    }),
});

export const {useGetVenueQuery, useGetVenueDetailsQuery} = venueApi;