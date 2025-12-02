import { useState } from "react";
import { useGoBack } from "../../hooks/useGoBack";
import { useGetAllTournamentQuery } from "../../features/tournament/tournamentApi";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import { fontStyle } from "../../utils/ClassUtils";
import Table from "../../component/common/Table/Table";
import TableHeader from "../../component/common/Table/TableHeader";
import TableSkeleton from "../../component/common/Table/TableSkeleton";
import TableEmpty from "../../component/common/Table/TableEmpty";
import TableRow from "../../component/common/Table/TableRow";
import { BookOpenText, Calendar, Edit, Edit2, Edit3, ImagePlus, TrendingUp } from "lucide-react";
import Dropdown from "../../component/common/dropdown/Dropdown";
import Buttons from "../../component/common/Buttons";
import { Link } from "react-router-dom";

const statusOptions = [
  { label: "All", value: undefined },
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
];

const ManageTournament = () => {
  const goBack = useGoBack();
  const [status, setStatus] = useState<string | undefined>();

  // fetch tournament 
  const { data, isLoading, isError } = useGetAllTournamentQuery(status);

  const tournaments = data?.data.tournaments ?? [];

  

  //header data
  const headerData = ["Photo", "Tournament Name", "Format", "status", "Action"];

 

  let content = null;

  if (isLoading) {
    content = [...Array(5)].map((_, index) => (
      <TableSkeleton key={index} columns={headerData.length} />
    ));
  } else if (isError || tournaments.length === 0) {
    content = <TableEmpty message="No Data Found!" />
  } else {
    content = tournaments.map((t) => (
      <TableRow key={t._id}
        rowData={[
          <div className="flex items-center gap-4">
            <img
              className="w-10 h-10 rounded-full object-cover object-center"
              src={t.photo}
              alt="Blog"
              loading="lazy"
            />
          </div>,
          t.tournamentName,
          t.tournamentType,
          t.status,
          t.status === "completed"
          ?
          <Link to={`/dashboard/tournament/details/${t?._id}`}>
          <Buttons className="rounded py-2 px-3" iconLeft={<BookOpenText size={14}/>} size="sm" variant="primary">view</Buttons>
          </Link>
          :
          <div >
            <Dropdown className="bg-primary rounded-md">
              <Dropdown.Trigger className="bg-primary text-white">
                <Edit2 size="14" /> Edit
              </Dropdown.Trigger>
              <Dropdown.Menu className="-left-[168px] -top-20">
                <Dropdown.Item href={`/dashboard/tournament/details/${t?._id}`}>
                  <BookOpenText size={14} /> Read Details
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/tournament/updateDetails/${t?._id}`}>
                  <Edit3 size={14} /> Edit Details
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/tournament/updatePhoto/${t?._id}`}>
                  <ImagePlus size={14} /> Edit Photo
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/tournament/updateDate/${t?._id}`}>
                  <Calendar size={14} /> Edit Date
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/tournament/updateStatus/${t?._id}`}>
                  <TrendingUp size={14} /> Edit Status
                </Dropdown.Item>
                <Dropdown.Item href={`/dashboard/tournament/createResult/${t?._id}`}>
                  <Edit size={14} /> Create Result
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
            
        ]}
      />
    ))
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <SectionLayout>
        <h1 className={`${fontStyle.pageTitle} text-center text-font mb-6`}>
          Tournaments
        </h1>

        {/* pils for filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {statusOptions.map((f) => (
            <button
              key={f.label}
              onClick={() => setStatus(f.value)}
              className={`
                px-4 py-2 rounded-lg border border-border text-subtext text-sm font-medium 
                transition-all duration-200
                ${status === f.value
                  ? "bg-bg text-font border-subSurface shadow"
                  : "bg-transparent  dark:hover:bg-subSurface"
                }
              `}
            >
              {f.label}
            </button>
          ))}

        </div>
      </SectionLayout>
      <SectionLayout>
      <Table>
        <TableHeader headers={headerData} />
      {content}
      </Table>
      </SectionLayout>
    </PageLayout>
  )
};

export default ManageTournament;