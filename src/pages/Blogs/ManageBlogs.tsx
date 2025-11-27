import { z } from "zod";
import { useState, useMemo } from "react";
import { useManageBlogsQuery, useUpdatePublishStatusMutation } from "../../features/blog/blogApi";
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
import { filterBlogSchema } from "../../utils/schema/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../component/common/input/TextInput";
import { BookOpenText, Edit2, Edit3, Filter, Search } from "lucide-react";
import ConfirmModal from "../../component/ui/modal/ConfirmModal";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import Dropdown from "../../component/common/dropdown/Dropdown";



type FilterBlogsType = z.infer<typeof filterBlogSchema>;

const ManageBlogs = () => {
  // states for modal 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // state for select specefic blog
  const [selectedBlog, setSelectedBlog] = useState<{ blogId: string; isPublished: boolean } | null>(null);

  // publish blog api slice
  const [updatePublishStatus] = useUpdatePublishStatusMutation()

  // publish controller 
  const handleConfirm = async () => {
    // if blog id not select, return
    if (!selectedBlog) return;
    setLoading(true);

    const loadingId = LoadingToast({ msg: "Updating Blog Details..." });

    try {
      const { blogId, isPublished } = selectedBlog;
      const updateStatus = { isPublished: !isPublished };

      await updatePublishStatus({ blogId, data: updateStatus }).unwrap();
      toast.dismiss(loadingId)
      SuccessToast({ msg: "Blog Status Update Successfully" })
      setSelectedBlog(null);
      setOpen(false)

    } catch (error) {
      ErrorToast({ msg: "Blog status update failed" })
      toast.dismiss(loadingId)
      setOpen(false);
    } finally {
      toast.dismiss(loadingId)
      setLoading(false)
      setOpen(false);
    }
  };

  // pagination 
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // manage api slice
  const { data: blogs, isLoading, isError } = useManageBlogsQuery({
    page: currentPage,
    limit: pageSize,
    ...filters,
  });

  // pagination page number
  const totalPages = blogs?.pagination?.totalPages ?? 1;

  // filter data 
  const headerData = useMemo(() => ["Photo", "Title", "Status", "Update", "Action"], []);

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
  // handle submit for filter blogs
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

  // clear blog filter
  const handleClearFilters = () => {
    reset();
    setFilters({});
    setCurrentPage(1);
  };


  // edit button functionality
  // state and ref for edit dropdown


  // blog table for manage
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
              className="w-10 h-10 rounded-full object-cover object-center"
              src={blog.photo}
              alt="Blog"
              loading="lazy"
            />
          </div>,
          blog.title?.length > 55 ? blog.title.slice(0, 55) + "..." : blog.title,
          blog.isPublished ? "Published" : "Not Published",

          <div >
            <Dropdown className="">
              <Dropdown.Trigger>
                <Edit2 size="14" /> Edit
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item href={`/dashboard/blogs/details/${blog?._id}`}>
                 <BookOpenText size={14}/> Read Details
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/blog/update/${blog?._id}`}>
                 <Edit3 size={14}/> Edit Details
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/blog/updatePhoto/${blog?._id}`}>
                 <Edit2 size={14}/> Edit Photo
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>,
          <Buttons
            onClick={() => {
              setOpen(true);
              setSelectedBlog({
                blogId: blog._id,
                isPublished: blog.isPublished,
              });
            }}
            className="rounded"
            size="sm"
            variant='primary'
          >
            {blog?.isPublished ? "Unpublish" : "Publish"}
          </Buttons>
        ]}
      />
    ));
  }, [isLoading, isError, blogs, headerData]);



  return (
    <PageLayout>
      <BackButton className="mb-5" onClick={useGoBack()}>Go Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-font text-center`}>Manage Tournament Blogs</h1>
      <div className="w-full bg-surface paddingTable my-5 overflow-x-auto py-8 rounded-lg">
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
      <ConfirmModal
        isOpen={open}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        loading={loading}
        title="Are you sure?"
        description="You can control Publish status"
      />
    </PageLayout>
  );
};

export default ManageBlogs;