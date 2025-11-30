import { apiSlice } from "../api/apiSlice";

export const registrationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegisterApplication : builder.query({
            query: ({id, status}) => ({
                url: `tournamentRegister/get_all/${id}?status=${status}`,
                method: "GET"
            }),
        }),
    }),
});

export const {useGetRegisterApplicationQuery} = registrationApi;