import { apiSlice } from "../api/apiSlice";


const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (data: FormData) => ({
                url: "auth/register",
                method: "POST",
                body: data,
            })
        }),
        signIn: builder.mutation({
            query : (data) => ({
                url: "auth/login",
                method: "POST",
                body: data
            })
        })
    })
});


export const {useSignUpMutation, useSignInMutation} = authApi;

