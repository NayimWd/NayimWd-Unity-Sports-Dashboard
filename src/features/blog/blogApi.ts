import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "blog/getAll"
        }),
        blogDetails: builder.query({
            query: (blogId) => `blog/details/${blogId}`
        })
    })
});

export const {useGetBlogsQuery, useBlogDetailsQuery} = blogApi;