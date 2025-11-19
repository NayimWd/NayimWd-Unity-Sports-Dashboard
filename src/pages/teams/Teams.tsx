import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout"
import { useGetTeamsQuery } from "../../features/team/teamApi"
import { teamSearch, teamSearchSchema } from "../../utils/schema/teamSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TeamSkeleton from "../../component/common/skeleton/TeamSkeleton";
import EmptyData from "../../component/ui/EmptyData";
import BackButton from "../../utils/BackButton";
import { useGoBack } from "../../hooks/useGoBack";
import { fontStyle } from "../../utils/ClassUtils";
import TeamCard from "../../component/common/card/TeamCard";
import TablePagination from "../../component/common/Table/TablePagination";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import { Filter, Search } from "lucide-react";
import DropdownInput from "../../component/common/input/DropdownInput";
import Buttons from "../../component/common/Buttons";

const Teams = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<teamSearchSchema>({});

  const { data: teams, isLoading, isError } = useGetTeamsQuery({
    page: currentPage,
    limit: pageSize,
    search: filters.search || "",
    sort: filters.sort || ""
  });

  const totalPages = teams?.pagination.totalPages ?? 1;

  const sortOptions = [
    { label: "Ascending", value: "" },
    { label: "Descending", value: "oldest" },
  ];



  // form functionality
  const form = useForm<teamSearchSchema>({
    resolver: zodResolver(teamSearch),
    mode: "onSubmit",
    defaultValues: {
      search: "",
      sort: ""
    }
  });

  // reset form
  const { reset } = form;

  // form handler
  const handleSubmit = (data: teamSearchSchema) => {
    const teamFilter = {
      search: data.search?.trim() || "",
      sort: data.sort || ""
    };

    setFilters(teamFilter);
    // for filter change, reset to 1
    setCurrentPage(1);
  };

  // form cleaner
  const handleClearFilters = () => {
    reset();
    setFilters({});
    setCurrentPage(1);
  }


  // team cards
  let content = null;

  if (isLoading) {
    content = (
      <>
        {[...Array(6)].map((__, index) => (
          <TeamSkeleton key={index} />
        ))}
      </>
    )
  } else if (isError) {
    content = <EmptyData message="Something Went Wrong! No Blogs Found" />;
  } else if (!teams?.teams || teams.teams.length === 0) {
    content = <EmptyData message="No Blogs Found" />;
  } else {
    content = teams.teams.map((team) => (
      <TeamCard
        key={team._id}
        _id={team._id}
        teamName={team.teamName}
        teamLogo={team.teamLogo}
      />
    ))
  }


  return (
    <PageLayout>
      <BackButton onClick={useGoBack()}>Go Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-font text-center mt-5`}> Teams </h1>
      <p className="text-font text-xl">Total Teams: {teams?.totalTeams}</p>
      {/* filter bar */}
      <SectionLayout>
        <FormContainer
          methods={form}
          onSubmit={handleSubmit}
          className="w-full flex flex-wrap justify-center gap-3 lg:gap-10 items-center"
        >
          <TextInput label="Search" name="search" placeholder="Search by Team Name..." icon={<Search size={16} />} />
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
      </SectionLayout>
      <div className="w-full mx-auto mt-5 grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {content}
      </div>
      <TablePagination
        currentPage={currentPage}
        totalPage={totalPages}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1)
        }}
      />
    </PageLayout>
  )
}

export default Teams;