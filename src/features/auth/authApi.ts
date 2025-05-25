import { ApiResponse, IUser } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data: FormData) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    currentUser: builder.query<IUser, void>({
      query: () => ({
        url: "auth/current_user",
      }),
      transformResponse: (respoinse: ApiResponse<IUser>) => respoinse.data,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useCurrentUserQuery,
} = authApi;
