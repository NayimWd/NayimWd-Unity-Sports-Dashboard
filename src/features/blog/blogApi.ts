import { ApiResponse, BlogDetails, Blogs } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

 const blogApi = apiSlice.injectEndpoints({
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
    getRelatedBlogs: builder.query<Blogs, { tags: string; limit: number }>({
      query: ({ tags, limit = 5 }) => ({
        url: `blog/getAll`,
        method: "GET",
        params: { tags, limit },
      }),
      transformResponse: (response: ApiResponse<Blogs>) => response.data,
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "blog/create",
        method: "POST",
        body: data
      })
    })
  }),
});

export const {
  useGetBlogsQuery,
  useBlogDetailsQuery,
  useGetRelatedBlogsQuery,
} = blogApi;
