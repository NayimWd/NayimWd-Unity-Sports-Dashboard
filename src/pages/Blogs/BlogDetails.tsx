import { useParams } from "react-router-dom"
import Banner from "../../component/common/banner/Banner";
import { useBlogDetailsQuery, useGetRelatedBlogsQuery } from "../../features/blog/blogApi";
import { Clock9, Heart, Star } from "lucide-react";
import CopyButton from "../../component/ui/CopyButton";
import { fontStyle } from "../../utils/ClassUtils";
import { formatDate } from "../../utils/timeFormat";
import { BlogDetailsSkeleton } from "../../component/common/skeleton/BlogDetailsSkeleton";
import { useCurrentUrl } from "../../utils/Url";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import SectionError from "../../component/common/error/SectionError";
import TableEmpty from "../../component/common/Table/TableEmpty";
import BlogCard from "../../component/common/card/BlogCard";
import ScrollToTop from "../../utils/scrollToTop";


const BlogDetails = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useBlogDetailsQuery(blogId)

  // share function
  const currentUrl = useCurrentUrl();
  const handleShare = () => {
    navigator.clipboard.writeText(currentUrl)
  }

  // fetch related blogs
  const { data: relatedBlogs, isLoading: loadingRelatedBlog, error } = useGetRelatedBlogsQuery({ tags: blog?.tags ?? "", limit: 5 });

  let content = null;

  if (loadingRelatedBlog) {
    content = <>
      {
        [...Array(6)].map((_, index) => (
          <BlogSkeleton key={index} />
        ))
      }
    </>
  } else if (!loadingRelatedBlog && error) {
    content = <div>
      content = <>
        <SectionError message="Fetch Related Video Failed! Something went wrong" />
      </>
    </div>
  } else if (!loadingRelatedBlog && !error && relatedBlogs?.blogs.length === 0) {
    content = <div>
      content = <>
        <TableEmpty message="No Related Blogs found!" />
      </>
    </div>
  } else if (!loadingRelatedBlog && !error && relatedBlogs?.blogs.length !== 0) {
    content = relatedBlogs?.blogs?.map((blog: any) => (
      <BlogCard
        key={blog._id}
        _id={blog._id}
        title={blog.title}
        photo={blog.photo}
        author={blog.author}
        createdAt={blog.createdAt}
        tags={blog.tags}
      />
    ))
  }

  return (
    <div className="w-full">
      <Banner pageText="Blog Details" navText="Blog" navLink="Details" />
      {
        isLoading ?
          <BlogDetailsSkeleton />
          :
          <div className="paddingX w-full bg-surface flex flex-col gap-10 justify-center items-center my-20 py-10">
            <div className="w-full  max-w-2xl">
              <img
                src={blog?.photo[0]}
                className="w-full  max-h-[420px] object-fill object-center rounded-md " alt="BlogPhoto" loading="lazy" />
            </div>
            <div className="w-full">
              {/* author and share button */}
              <div className="flex justify-between w-full">
                <p className="text-subtext"> Author: {blog?.author} </p>
                <div className="flex items-center gap-1">
                  <div onClick={handleShare} className="flex justify-center items-center w-7 h-7 hover:shadow cursor-pointer rounded bg-bg hover:bg-subSurface">
                    <CopyButton textCopy="Share" />
                  </div>
                  <span className=" flex justify-center items-center w-7 h-7 hover:shadow cursor-pointer rounded bg-bg hover:bg-subSurface">
                    <Star size={20} className="text-orange-400" />
                  </span>
                  <span className="flex justify-center items-center w-7 h-7 hover:shadow cursor-pointer rounded bg-bg hover:bg-subSurface">
                    <Heart size={20} className="text-red-500" />
                  </span>
                </div>
              </div>
              {/* Blog title */}
              <div className={` my-10 `}>
                <h1 className={`${fontStyle.pageDesc} mt-10 text-font mb-4`}>
                  {
                    blog?.title
                  }
                </h1>
                <div className="flex justify-between items-center">
                  <p className="text-subtext font-inter uppercase"> {blog?.tags} </p>
                  <span className="flex items-center gap-4">
                    <Clock9 className="text-red-500" size={16} />
                    <p className="text-subtext leading-8 tracking-wide font-merriweather"> {blog ? formatDate(blog.createdAt) : ""} </p>
                  </span>
                </div>
              </div>
              {/* Blog Description */}
              <p className="text-font font-inter text-foreground tracking-wider leading-relaxed transition-all duration-300 hover:pl-2">
                {blog?.content}
              </p>
            </div>
          </div>
      }
      <div className="my-10 paddingX">
        <h2 className={`${fontStyle.SectionHeading} text-font font-inter mb-5 text-center`}> Related Vlogs </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {
          content
        }
        </div>
      </div>
      <ScrollToTop/>
    </div>
  )
}

export default BlogDetails;