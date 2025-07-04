import { useState } from "react"
import { useManageBlogsQuery } from "../../features/blog/blogApi";
import TablePagination from "../../component/common/Table/TablePagination";
import { fontStyle } from "../../utils/ClassUtils";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import Buttons from "../../component/common/Buttons";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";



const ManageBlogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogs, isLoading } = useManageBlogsQuery({ page: currentPage, limit: pageSize });

  const headerData = ["Photo", "Title", "Status", "Details"];
  const totalPages = blogs?.pagination?.totalPages ?? 1;

  let content = null;

  if (isLoading) {
    content = [...Array(5)].map((_, index) => (
      <TableSkeleton key={index} columns={headerData.length} />
    ));
  } else if (!isLoading && blogs?.blogs?.length === 0) {
    content = <TableEmpty colSpan={headerData.length} message="No Blogs Found!" />;
  } else {
    content = blogs?.blogs.map((blog: any) => (
      <TableRow
        key={blog._id}
        rowData={[
          <div className="flex items-center gap-4">
            <img
              className="w-8 h-8 rounded-5 object-cover"
              src={blog?.photo}
              alt="Blog"
              loading="lazy"
            />
          </div>,
          blog?.title.length > 70 ? blog.title.slice(0, 60) + "..." : blog.title,
          blog.isPublished ? "Published" : "Not Published",
          <Buttons size="md" variant="outline">
            Details
          </Buttons>,
        ]}
      />
    ));
  }

  return (
    <div>
      <h1 className={`${fontStyle.pageTitle} text-font`}>Manage Tournament Blogs</h1>
      <div className="w-full bg-surface paddingTable my-5 overflow-x-auto py-8 rounded">
        <Table>
          <TableHeader headers={headerData} />
          {content}
        </Table>
      </div>
      <div className="w-full flex justify-center mt-6">
        <TablePagination
          currentPage={currentPage}
          totalPage={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default ManageBlogs;