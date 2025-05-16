import { ApiResponse, BlogDetails, Blogs } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<Blogs, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `blog/getAll?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Blogs>) => response.data,
    }),
    blogDetails: builder.query({
      query: (blogId) => ({
        url: `blog/details/${blogId}`,
      }),
      transformResponse: (response: ApiResponse<BlogDetails>) => response.data,
    }),
  }),
});

export const { useGetBlogsQuery, useBlogDetailsQuery } = blogApi;
