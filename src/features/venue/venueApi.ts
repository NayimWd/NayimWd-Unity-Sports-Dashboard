import { apiSlice } from "../api/apiSlice";

const venueApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVenue: builder.query({
            query: () => ({
                url: `venue/all`,
                method: "GET"
            })
        })
    })
});

export const {useGetVenueQuery} = venueApi;