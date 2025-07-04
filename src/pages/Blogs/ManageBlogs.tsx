import { useState } from "react"
import { useManageBlogsQuery } from "../../features/blog/blogApi";
import TablePagination from "../../component/common/Table/TablePagination";
import { fontStyle } from "../../utils/ClassUtils";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import BlogCard from "../../component/common/card/BlogCard";

const ManageBlogs = () => {
// pagination 
const [pageSize, setPageSize] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
// fetch manage blogs
const {data : blogs, isLoading, isError} = useManageBlogsQuery({page: currentPage, limit: pageSize})

// total page size 
const totalPages = blogs?.pagination?.totalPages ?? 1;

let content = null;
 
  if (isLoading) {
    content = <>
      {
        [...Array(6)].map((__, index) => (
          <BlogSkeleton key={index} />
        ))
      }
    </>
  } else if (!isLoading && isError) {
    content = <div className="w-full text-center text-toastErrorText text-lg"> Something went wrong! </div>
  } else if (!isLoading && !isError && blogs?.blogs?.length === 0) {
    content = <TableEmpty message="No Blogs Found" />
  } else {
    content = blogs?.blogs.map((blog: any) => (
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
      <h1 className={`${fontStyle.pageTitle} text-font`}>Manage Tournament Blogs </h1>
            <div className="mt-5 grid gap-5 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
              {content}
            </div>
      <div className="w-full flex justify-center">
        <TablePagination
          currentPage={currentPage}
          totalPage={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) =>{
             setPageSize(size)
             setCurrentPage(1);
            }
            }
        />
      </div>
      </div>
  )
}

export default ManageBlogs