import {
  IApplicationDetails,
  IRegistrations,
} from "../../utils/types/applicationType";
import { ApiResponse } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

export const registrationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegisterApplication: builder.query<ApiResponse<IRegistrations>, any>({
      query: ({ id, status }) => ({
        url: `tournamentRegister/get_all/${id}?status=${status}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<IRegistrations>) => response,
      providesTags: [{ type: "Registration", id: "LIST" }],
    }),
    getApplicationDetails: builder.query<
      ApiResponse<IApplicationDetails>,
      string
    >({
      query: (id) => ({
        url: `tournamentRegister/application/details/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Registration", id: "LIST" }],
    }),
    applyForTournament: builder.mutation({
      query: ({ tournamentId, teamId }) => ({
        url: `tournamentRegister/apply/${tournamentId}`,
        method: "POST",
        body: { teamId },
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Registration", id: tournamentId },
      ],
    }),
    myApplication: builder.query({
      query: ({ tournamentId }) => ({
        url: `tournamentRegister/application/${tournamentId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { tournamentId }) => [
        { type: "Registration", id: tournamentId },
      ],
    }),
    withdraw: builder.mutation({
      query: ({ tournamentId, teamId }) => ({
        url: `tournamentRegister/withdraw/${tournamentId}`,
        method: "PATCH",
        body: {teamId},
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Registration", id: tournamentId },
      ],
    }),
    reApply: builder.mutation({
      query: ({ tournamentId, teamId }) => ({
        url: `tournamentRegister/reApply/${tournamentId}`,
        method: "PATCH",
        body: {teamId},
      }),
      invalidatesTags: (_result, _error, { tournamentId }) => [
        { type: "Registration", id: tournamentId },
      ],
    }),
  }),
});

export const {
  useGetRegisterApplicationQuery,
  useGetApplicationDetailsQuery,
  useApplyForTournamentMutation,
  useMyApplicationQuery,
  useWithdrawMutation,
  useReApplyMutation
} = registrationApi;
