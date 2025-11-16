import {
  ApiResponse,
  IAllUsersData,
  IUser,
  IUserQueryParams,
} from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";
import { setCredentials, clearCredenTials, setAuthLoaded } from "./authSlice";

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
      transformResponse: (response: ApiResponse<IUser>) => response.data,
      keepUnusedDataFor: 70,
      providesTags: ["User"],

      // life cycle handler
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          dispatch(clearCredenTials());
        } finally {
          dispatch(setAuthLoaded(true));
        }
      },
    }),
    AllUser: builder.query<ApiResponse<IAllUsersData>, IUserQueryParams>({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params.page) queryString.append("page", params.page.toString());
        if (params.limit) queryString.append("limit", params.limit.toString());
        if (params.name) queryString.append("name", params.name);
        if (params.email) queryString.append("email", params.email);
        if (params.role) queryString.append("role", params.role);
        if (params.sortField) queryString.append("sortField", params.sortField);
        if (params.sortOrder) queryString.append("sortOrder", params.sortOrder);

        return {
          url: `auth/all_users?${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useCurrentUserQuery,
  useAllUserQuery,
} = authApi;
