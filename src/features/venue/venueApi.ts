import { ApiResponse } from "../../utils/types/types";
import { IVenue, IVenueDetails } from "../../utils/types/venueType";
import { apiSlice } from "../api/apiSlice";

const venueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVenue: builder.query<ApiResponse<IVenue>, void>({
      query: () => ({
        url: `venue/all`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IVenue>) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.data.venues.map(({ _id }) => ({
                type: "Venue" as const,
                id: _id,
              })),
              { type: "Venue", id: "LIST" },
            ]
          : [{ type: "Venue", id: "LIST" }],
    }),
    getVenueDetails: builder.query<ApiResponse<IVenueDetails>, string>({
      query: (venueId) => ({
        url: `venue/details/${venueId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IVenueDetails>) => response,
      providesTags: (_result, _error, venueId) => [
        {
          type: "Venue",
          id: venueId,
        },
      ],
    }),
  }),
});

export const { useGetVenueQuery, useGetVenueDetailsQuery } = venueApi;
