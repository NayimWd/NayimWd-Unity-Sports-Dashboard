import {
  ManagerProfile,
  PlayerProfile,
  UmpireProfile,
} from "../../utils/types/profileType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerProfile: builder.query<PlayerProfile, any>({
      query: () => ({
        url: `profile/get_player_profile`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<PlayerProfile>) =>
        response.data,
      providesTags: () => [
         {type: "PlayerProfile", id: "LIST"},
      ]
    }),
    getManagerProfile: builder.query<ManagerProfile, any>({
      query: () => ({
        url: `profile/get_manager_profile`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<ManagerProfile>) =>
        response.data,
      providesTags: () => [
         {type: "managerProfile", id: "LIST"},
      ]
    }),
    getUmpireProfile: builder.query<UmpireProfile, any>({
      query: () => ({
        url: `profile/get_umpire_profile`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<UmpireProfile>) =>
        response.data,
      providesTags: () => [
         {type: "umpireProfile", id: "LIST"},
      ]
    }),
    createPlayerProfile: builder.mutation({
      query: (data)=> ({
        url: "profile/create_player_profile",
        method: "POST",
        body: data
      }),
      invalidatesTags: () => [
        {type: "PlayerProfile", id: "LIST"},
      ]
    })
  }),
});

export const {
  useGetPlayerProfileQuery,
  useGetUmpireProfileQuery,
  useGetManagerProfileQuery,
  useCreatePlayerProfileMutation,
} = profileApi;
