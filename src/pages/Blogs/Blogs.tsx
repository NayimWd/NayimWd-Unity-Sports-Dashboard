import { z } from "zod";
import { useState } from "react";
import BlogCard from "../../component/common/card/BlogCard";
import BlogSkeleton from "../../component/common/skeleton/BlogSkeleton";
import TablePagination from "../../component/common/Table/TablePagination";
import { useGetBlogsQuery } from "../../features/blog/blogApi"
import { fontStyle } from "../../utils/ClassUtils";
import { filterAllBlogsSchema } from "../../utils/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import { Filter, Search } from "lucide-react";
import DropdownInput from "../../component/common/input/DropdownInput";
import Buttons from "../../component/common/Buttons";
import EmptyData from "../../component/ui/EmptyData";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";

type FilterAllBlogsType = z.infer<typeof filterAllBlogsSchema>


const Blogs = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterAllBlogsType>({});
  // fetch blog
  const { data: blogs, isLoading, isError } = useGetBlogsQuery({ page: currentPage, limit: pageSize, ...filters });
  // set page size 
  const totalPages = blogs?.pagination?.totalPages ?? 1;

  // sort options 
  const tagsOptions = [
    { label: "news", value: "news" },
    { label: "highlight", value: "highlight" },
    { label: "tournaments", value: "tournaments" },
    { label: "awards", value: "awards" },
  ];


  const sortOptions = [
    { label: "Ascending", value: "" },
    { label: "Descending", value: "oldest" },
  ];

  // form functionality
  const form = useForm<FilterAllBlogsType>({
    resolver: zodResolver(filterAllBlogsSchema),
    mode: "onSubmit",
    defaultValues: {
      search: "",
      tags: "",
      sort: ""
    }
  })

  const { reset } = form;

  const handleSubmit = (data: FilterAllBlogsType) => {
    const blogFilter = {
      search: data.search?.trim() || "",
      tags: data.tags || "",
      sort: data.sort || ""
    }

    setFilters(blogFilter);
    setCurrentPage(1); // on filter change, rest to 1
  }


  // cleaner function 
  const handleClearFilters = () => {
    reset();
    setFilters({});
    setCurrentPage(1);
  };

  let content = null;

  if (isLoading) {
  content = (
    <>
      {[...Array(6)].map((__, index) => (
        <BlogSkeleton key={index} />
      ))}
    </>
  );
} else if (isError) {
  content = <EmptyData message="No Blogs Found" />;
} else if (!blogs?.blogs || blogs.blogs.length === 0) {
  content = <EmptyData message="No Blogs Found" />;
} else {
  content = blogs.blogs.map((blog: any) => (
    <BlogCard
      key={blog._id}
      _id={blog._id}
      title={blog.title}
      photo={blog.photo}
      author={blog.author}
      createdAt={blog.createdAt}
      tags={blog.tags}
    />
  ));
}

  return (
    <PageLayout>
      <BackButton onClick={useGoBack()}>Go Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-font text-center mt-5`}> Tournament Blogs </h1>
      <div className="w-full bg-surface paddingTable my-5 overflow-x-auto py-8 rounded-lg shadow">
        <FormContainer
          methods={form}
          onSubmit={handleSubmit}
          className="w-full flex flex-wrap justify-center gap-3 lg:gap-10 items-center"
        >
          <TextInput label="Search" name="search" placeholder="Search by title..." icon={<Search size={16} />} />
          <DropdownInput label="Select Tag" name="tags" options={tagsOptions} />
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
      </div>
      <div className="w-full mx-auto mt-5 grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {content}
      </div>
      <div className="w-full flex justify-center">
        <TablePagination
          currentPage={currentPage}
          totalPage={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1);
          }
          }
        />
      </div>
    </PageLayout>
  )
}

export default Blogs;