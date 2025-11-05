import { ApiResponse, IUser } from "../../utils/types/types";
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        myAccount: builder.query<IUser, void>({
            query: ()=> ({
                url: "auth/current_user",
            }),
            transformResponse: (response: ApiResponse<IUser>) => response.data,
            keepUnusedDataFor: 40,
            providesTags: ["User"]
        })
    })
});

export const {useMyAccountQuery} = authApi;