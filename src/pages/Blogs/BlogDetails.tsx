import { useParams } from "react-router-dom"
import Banner from "../../component/common/banner/Banner";
import { useBlogDetailsQuery, useGetRelatedBlogsQuery } from "../../features/blog/blogApi";
import { Clock9, Heart, Star } from "lucide-react";
import CopyButton from "../../component/ui/CopyButton";
import { formatDate } from "../../utils/timeFormat";
import { BlogDetailsSkeleton } from "../../component/common/skeleton/BlogDetailsSkeleton";
import { useCurrentUrl } from "../../utils/Url";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import SectionError from "../../component/common/error/SectionError";
import TableEmpty from "../../component/common/Table/TableEmpty";
import BlogCard from "../../component/common/card/BlogCard";
import ScrollToTop from "../../utils/scrollToTop";
import SafeHtmlRender from "../../component/common/input/inputUtils/SafeHtmlRender";

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

  {isLoading ? (
    <BlogDetailsSkeleton />
  ) : (
    <div className="paddingX lg:px-10 w-full max-w-5xl mx-auto bg-surface my-20 py-12 rounded-xl shadow-sm space-y-10">
      
      {/* Blog Banner Image */}
      <div className="w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={blog?.photo[0]}
          alt="Blog Cover"
          className="w-full h-[420px] object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Author and Action Row */}
      <div className="flex justify-between items-center text-sm text-muted">
        <p className="">By <span className="font-medium text">{blog?.author}</span></p>
        <div className="flex gap-2 items-center">
          <div onClick={handleShare} className="bg-bg hover:bg-surface w-8 h-8 rounded flex items-center justify-center shadow transition">
          <CopyButton textCopy="Share" />
          </div>
          <button className="bg-bg hover:bg-subSurface w-8 h-8 rounded flex items-center justify-center shadow transition">
            <Star size={18} className="text-orange-400" />
          </button>
          <button className="bg-bg hover:bg-subSurface w-8 h-8 rounded flex items-center justify-center shadow transition">
            <Heart size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Blog Title + Metadata */}
      <div>
        <h1 className="w-full text-3xl font-bold font-inter text-foreground mb-4 leading-tight text-font">
          {blog?.title}
        </h1>
        <div className="flex justify-between text-sm text-muted-foreground uppercase text-subtext">
          <p>{blog?.tags}</p>
          <div className="flex items-center gap-2">
            <Clock9 size={16} className="text-red-500" />
            <span>{blog ? formatDate(blog.createdAt) : ""}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="w-full text-base md:text-lg  font-merriweather text-subtext">
        {<SafeHtmlRender html={blog?.content}/>}
      </article>
    </div>
  )}

  {/* Related Blogs */}
  <section className="my-16 paddingX max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-3xl xl:text-4xl text-font font-semibold text-center font-inter mb-8">
      Related Blogs
    </h2>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {content}
    </div>
  </section>

  <ScrollToTop />
</div>
  )
}

export default BlogDetails;