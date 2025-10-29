import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import SuspenseWrapper from "../utils/SuspenseWrapper";
import ErrorBoundaryWrapper from "../utils/ErrorWrapper";
const Blogs = lazy(() => import("../pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const CreateBlog = lazy(() => import("../pages/Blogs/CreateBlogs"));
const UpdateBlogDetails = lazy(()=> import("../pages/Blogs/UpdateBlogDetails"));
const UpdatePhoto = lazy(()=> import("../pages/Blogs/UpdateBlogPhoto"));
const ManageBlogs = lazy(()=> import("../pages/Blogs/ManageBlogs"));

export const blogRoutes: RouteObject[] = [
    {
        path: "blogs",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <Blogs />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blogs/details/:blogId",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <BlogDetails />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blog/create",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <CreateBlog />
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blog/update/:blogId",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <UpdateBlogDetails/>
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blog/updatePhoto/:blogId",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <UpdatePhoto/>
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
      {
        path: "blogs/manage",
        element: (
          <ErrorBoundaryWrapper>
            <SuspenseWrapper>
              <ManageBlogs/>
            </SuspenseWrapper>
          </ErrorBoundaryWrapper>
        )
      },
]