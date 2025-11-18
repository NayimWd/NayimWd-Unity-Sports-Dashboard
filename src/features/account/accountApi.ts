import { ApiResponse, IUser } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myAccount: builder.query<IUser, void>({
      query: () => ({
        url: "auth/current_user",
      }),
      transformResponse: (response: ApiResponse<IUser>) => response.data,
      keepUnusedDataFor: 300,
      providesTags: ["AuthUser"],
    }),
    editAccountDetails: builder.mutation({
      query: (data) => ({
        url: "auth/update_account",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AuthUser"],
    }),
    editAccountPhoto: builder.mutation({
      query: (data) => ({
        url: "auth/photo",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AuthUser"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change_password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AuthUser"],
    }),
    changeRole: builder.mutation({
      query: ({ userId, data }) => ({
        url: `auth/change_role/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_r, _e, { userId }) => [{ type: "User", id: userId }],
    }),
  }),
});

export const {
  useMyAccountQuery,
  useEditAccountDetailsMutation,
  useEditAccountPhotoMutation,
  useChangePasswordMutation,
  useChangeRoleMutation,
} = accountApi;
