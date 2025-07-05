import {z} from "zod";
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
import DropdownInput from "../../component/common/input/DropdownInput";
import FormContainer from "../../component/common/Form/FormContainer";
import { filterBlogSchema } from "../../utils/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../component/common/input/TextInput";
import { Filter, Search } from "lucide-react";

type filterBlogsType = z.infer<typeof filterBlogSchema>;

const ManageBlogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogs, isLoading } = useManageBlogsQuery({
    page: currentPage,
    limit: pageSize,
    // 🚀 You will add filters here later
  });

  const headerData = ["Photo", "Title", "Status", "Details"];
  const totalPages = blogs?.pagination?.totalPages ?? 1;

  const tags = [
    { label: "news", value: "news" },
    { label: "highlight", value: "highlight" },
    { label: "tournaments", value: "tournaments" },
    { label: "awards", value: "awards" },
  ];

  const status = [
    { label: "Published", value: "true" },
    { label: "Not Published", value: "false" },
  ];

  const sort = [
    { label: "asc", value: "" },
    { label: "desc", value: "oldest" },
  ];

  const method = useForm<filterBlogsType>({
    resolver: zodResolver(filterBlogSchema),
    mode: "onSubmit",
  });

  const handleSubmit = async (data: filterBlogsType) => {
    try {
      const filters = {
        ...data,
        isPublished:
          data.isPublished === true
            ? true
            : data.isPublished === false
            ? false
            : undefined,
      };

      console.log(filters);
      // 👉 Call refetch here if needed or pass filters to query
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="w-full">
          <FormContainer
            methods={method}
            onSubmit={handleSubmit}
            className="w-full flex flex-wrap justify-center gap-10 items-center"
          >
            <TextInput label="Search" name="search" placeholder="Search" icon={<Search size={16} />} />
            <DropdownInput label="Select a Tag" name="tags" options={tags} />
            <DropdownInput label="Status" name="isPublished" options={status} />
            <DropdownInput label="Sort" name="sort" options={sort} />
            <Buttons type="submit" className="rounded" iconLeft={<Filter size={16} />}>
              Filter
            </Buttons>
          </FormContainer>
        </div>
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