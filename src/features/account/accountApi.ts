import { ApiResponse, IUser } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myAccount: builder.query<IUser, void>({
      query: () => ({
        url: "auth/current_user",
      }),
      transformResponse: (response: ApiResponse<IUser>) => response.data,
      keepUnusedDataFor: 40,
      providesTags: ["User"],
    }),
    editAccountDetails: builder.mutation({
      query: (data) => ({
        url: "auth/update_account",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    editAccountPhoto: builder.mutation({
      query: (data) => ({
        url: "auth/photo",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change_password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useMyAccountQuery,
  useEditAccountDetailsMutation,
  useEditAccountPhotoMutation,
  useChangePasswordMutation,
} = authApi;
