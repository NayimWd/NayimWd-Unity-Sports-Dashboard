import BlogCard from "../../component/common/card/BlogCard";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TablePagination from "../../component/common/Table/TablePagination";
import { useGetBlogsQuery } from "../../features/blog/blogApi"
import { fontStyle } from "../../utils/ClassUtils";

const Blogs = () => {

  // fetch blog
  const {data: blogs, isLoading, error } = useGetBlogsQuery({});

  console.log(blogs)

  let content = null;

  if(isLoading){
    content = <>
      {
        [...Array(6)].map((__, index) => (
          <BlogSkeleton key={index} />
        ))
      }
    </>
  } else if(!isLoading && error) {
    content = <div className="w-full text-center text-toastErrorText text-lg"> Something went wrong! </div>
  } else if(!isLoading && !error && blogs.data?.blogs?.length === 0){
      content = <TableEmpty message="No Blogs Found"/>
  } else{
    content = blogs.data?.blogs.map((blog: any) => (
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
    <div className="my-5 w-full">
      <h1 className={`${fontStyle.pageTitle} text-font`}> Tournament Blogs </h1>
      <div className="mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
      {content}
      </div>
      <div className="w-full flex justify-center">
      <TablePagination
       currentPage={1}
        totalPage={10}
        pageSize={5}
        onPageChange={(page) => console.log("Page changed to:", page)}
        onPageSizeChange={(size) => console.log("Page size changed to:", size)}
        />
        </div>
    </div>
  )
}

export default Blogs