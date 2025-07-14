
import { apiSlice } from "../api/apiSlice";

const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlayerProfile: builder.query({
            query: () => ``
        })
    })
})