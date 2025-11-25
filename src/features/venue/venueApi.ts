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
    createVenue: builder.mutation({
      query: (data) => ({
        url: `venue/create`,
        method: "POST",
        body: data
      }),
      invalidatesTags: [{type: "Venue", id: "LIST"}]
    }),
    updateVenueDetails: builder.mutation({
      query: ({venueId, data}) => ({
        url: `venue/update/${venueId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, { venueId }) => [
        { type: "Venue", id: venueId },
        { type: "Venue", id: "LIST" },
      ],
    }),
    updateVenuePhoto: builder.mutation({
      query: ({venueId, data}) =>({
        url: `venue/updatePhoto/${venueId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (_result, _error, {venueId}) => [
        {type: "Venue", id: venueId},
        {type: "Venue", id: "LIST"},
      ]
    })
  }),
});

export const { useGetVenueQuery, useGetVenueDetailsQuery, useCreateVenueMutation, useUpdateVenueDetailsMutation, useUpdateVenuePhotoMutation } = venueApi;
