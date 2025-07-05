import { ApiResponse, BlogDetails, Blogs } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<
      Blogs,
      {
        page: number;
        limit: number;
        search?: string;
        sort?: string;
        tags?: string;
      }
    >({
      query: ({ page, limit, search, sort, tags }) => {
        const queryParams = [
          `page=${page}`,
          `limit=${limit}`,
          search ? `search=${search}` : "",
          sort ? `sort=${sort}` : "",
          tags ? `tags=${tags}` : "",
        ]
          .filter(Boolean)
          .join("&");

        return {
          url: `blog/getAll?${queryParams}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<Blogs>) => response.data,
      providesTags: (result) =>
        result?.blogs.length
          ? [
              ...result.blogs.map((blog) => ({
                type: "Blog" as const,
                id: (blog as BlogDetails)?._id,
              })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),
    manageBlogs: builder.query<
      Blogs,
      {
        page: number;
        limit: number;
        search?: string;
        sort?: string;
        tags?: string;
        isPublished?: boolean;
      }
    >({
      query: ({ page, limit, search, sort, tags, isPublished }) => {
        const queryParams = [
          `page=${page}`,
          `limit=${limit}`,
          search ? `search=${search}` : "",
          sort ? `sort=${sort}` : "",
          tags ? `tags=${tags}` : "",
          typeof isPublished === "boolean" ? `isPublished=${isPublished}` : "",
        ]
          .filter(Boolean)
          .join("&");

        return {
          url: `blog/getAll?${queryParams}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<Blogs>) => response.data,
      providesTags: (result) =>
        result?.blogs.length
          ? [
              ...result.blogs.map((blog) => ({
                type: "Blog" as const,
                id: (blog as BlogDetails)?._id,
              })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),
    blogDetails: builder.query({
      query: (blogId) => ({
        url: `blog/details/${blogId}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<BlogDetails>) => response.data,
      // tags
      providesTags: (_result, _error, blogId) => [{ type: "Blog", id: blogId }],
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
        body: data,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    updateBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/blog/update/${blogId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { blogId }) => [
        { type: "Blog", id: blogId },
        { type: "Blog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useManageBlogsQuery,
  useBlogDetailsQuery,
  useGetRelatedBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
