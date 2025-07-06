import { z } from "zod";
import { useState, useMemo } from "react";
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

type FilterBlogsType = z.infer<typeof filterBlogSchema>;

const ManageBlogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { data: blogs, isLoading, isError } = useManageBlogsQuery({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  const totalPages = blogs?.pagination?.totalPages ?? 1;

  const headerData = useMemo(() => ["Photo", "Title", "Status", "Details"], []);

  const tagsOptions = [
    { label: "news", value: "news" },
    { label: "highlight", value: "highlight" },
    { label: "tournaments", value: "tournaments" },
    { label: "awards", value: "awards" },
  ];

  const statusOptions = [
    { label: "Published", value: "true" },
    { label: "Not Published", value: "false" },
  ];

  const sortOptions = [
    { label: "Ascending", value: "" },
    { label: "Descending", value: "oldest" },
  ];

  const form = useForm<FilterBlogsType>({
    resolver: zodResolver(filterBlogSchema),
    mode: "onSubmit",
    defaultValues: {
      search: "",
      tags: "",
      sort: "",
      isPublished: "" as any,
    },
  });

  const { reset } = form;

  const onSubmit = (data: FilterBlogsType) => {
    const sanitizedFilters = {
      search: data.search?.trim() || "",
      tags: data.tags || "",
      sort: data.sort || "",
      isPublished:
        data.isPublished === "true"
          ? true
          : data.isPublished === "false"
            ? false
            : "",
    };

    setFilters(sanitizedFilters);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handleClearFilters = () => {
    reset();
    setFilters({});
    setCurrentPage(1);
  };

  const content = useMemo(() => {
    if (isLoading) {
      return [...Array(5)].map((_, index) => (
        <TableSkeleton key={index} columns={headerData.length} />
      ));
    }

    if (isError || !blogs?.blogs?.length) {
      return <TableEmpty colSpan={headerData.length} message="No Blogs Found!" />;
    }

    return blogs.blogs.map((blog: any) => (
      <TableRow
        key={blog._id}
        rowData={[
          <div className="flex items-center gap-4">
            <img
              className="w-8 h-8 rounded-5 object-cover"
              src={blog.photo}
              alt="Blog"
              loading="lazy"
            />
          </div>,
          blog.title?.length > 60 ? blog.title.slice(0, 60) + "..." : blog.title,
          blog.isPublished ? "Published" : "Not Published",
          <Buttons size="md" variant="gradientD">
            Details
          </Buttons>,
        ]}
      />
    ));
  }, [isLoading, isError, blogs, headerData]);

  return (
    <div>
      <h1 className={`${fontStyle.pageTitle} text-font`}>Manage Tournament Blogs</h1>
      
      <div className="w-full bg-surface paddingTable my-5 overflow-x-auto py-8 rounded">
        <FormContainer
          methods={form}
          onSubmit={onSubmit}
          className="w-full flex flex-wrap justify-center gap-3 lg:gap-10 items-center"
        >
          <TextInput label="Search" name="search" placeholder="Search by title..." icon={<Search size={16} />} />
          <DropdownInput label="Select Tag" name="tags" options={tagsOptions} />
          <DropdownInput label="Status" name="isPublished" options={statusOptions} />
          <DropdownInput label="Sort" name="sort" options={sortOptions} />
          <div className="mt-7 flex items-center gap-4">
            <Buttons type="submit" className="rounded " iconLeft={<Filter size={16} />}>
              Filter
            </Buttons>

            <Buttons
              type="button"
              variant="secondary"
              className="rounded"
              onClick={handleClearFilters}
            >
              Clear
            </Buttons>
          </div>
        </FormContainer>

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