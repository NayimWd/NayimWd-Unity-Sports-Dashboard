import { useParams } from "react-router-dom"
import Banner from "../../component/common/banner/Banner";
import { useBlogDetailsQuery } from "../../features/blog/blogApi";
import { Clock9, Heart, Star } from "lucide-react";
import CopyButton from "../../component/ui/CopyButton";
import { fontStyle } from "../../utils/ClassUtils";
import { formatDate } from "../../utils/timeFormat";
import { BlogDetailsSkeleton } from "../../component/common/skeleton/BlogDetailsSkeleton";
import { useCurrentUrl } from "../../utils/Url";


const BlogDetails = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useBlogDetailsQuery(blogId)

  // share function
  const currentUrl = useCurrentUrl();
  const handleShare = () => {
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <div className="w-full">
      <Banner pageText="Blog Details" navText="Blog" navLink="Details" />
      {
        isLoading ?
          <BlogDetailsSkeleton />
          :
          <div className="paddingX w-full bg-surface flex flex-col gap-10 justify-center items-center my-36 py-10">
            <div className="w-full md:w-[80%] lg:w-[70%]">
              <img
                src={blog?.photo[0]}
                className="w-full h-80 object-cover rounded-md " alt="BlogPhoto" loading="lazy" />
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
              <p className="text-font font-inter tracking-wider">
                {blog?.content}
              </p>
            </div>
          </div>
      }
    </div>
  )
}

export default BlogDetails