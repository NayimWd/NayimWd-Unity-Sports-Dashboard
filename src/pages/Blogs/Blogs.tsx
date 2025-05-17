import { useState } from "react";
import BlogCard from "../../component/common/card/BlogCard";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TablePagination from "../../component/common/Table/TablePagination";
import { useGetBlogsQuery } from "../../features/blog/blogApi"
import { fontStyle } from "../../utils/ClassUtils";

const Blogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // fetch blog
  const { data: blogs, isLoading, error } = useGetBlogsQuery({ page: currentPage, limit: pageSize });
  // set page size 
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
  } else if (!isLoading && error) {
    content = <div className="w-full text-center text-toastErrorText text-lg"> Something went wrong! </div>
  } else if (!isLoading && !error && blogs?.blogs?.length === 0) {
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
    <div className="my-5 w-full paddingX">
      <h1 className={`${fontStyle.pageTitle} text-font`}> Tournament Blogs </h1>
      <div className="mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
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

export default Blogs