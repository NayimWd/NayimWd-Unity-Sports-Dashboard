import { useState } from "react";
import PageLayout from "../../component/layout/PageLayout";
import { useGetAllTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import TournamentCard from "../../component/common/card/tournamentCard";
import EmptyData from "../../component/ui/EmptyData";
import SectionLayout from "../../component/layout/SectionLayout";

const statusOptions = [
  { label: "All", value: undefined },
  { label: "Ongoing", value: "ongoing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
];

const Tournaments = () => {
  const goBack = useGoBack();
  const [status, setStatus] = useState<string | undefined>();

  // fetch tournament 
  const { data, isLoading } = useGetAllTournamentQuery(status);

  const tournaments = data?.data.tournaments ?? [];


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

      {/* content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center py-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl h-[380px] w-full"
            />
          ))}
        </div>
      ) : tournaments.length === 0 ? (
        <div className="flex justify-center py-16">
          <EmptyData message="No Tournament Found!" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center py-10">
          {tournaments.map(({ _id, tournamentName, tournamentType, status, photo, entryFee, startDate, endDate }) => (
            <TournamentCard key={_id}
              _id={_id}
              tournamentName={tournamentName}
              tournamentType={tournamentType}
              status={status}
              entryFee={entryFee}
              photo={photo}
              startDate={startDate ? startDate : ""}
              endDate={endDate ? endDate : ""}
            />
          ))}
        </div>
      )}
    </PageLayout>
  )
}

export default Tournaments;