import ResultSummary from "../component/common/banner/ResultSummary";
import SummaryCard from "../component/common/card/SummaryCard";
import PageLayout from "../component/layout/PageLayout";
import SectionLayout from "../component/layout/SectionLayout";
import { useGetLatestResultQuery, useGetSummaryQuery } from "../features/dashboard/summaryApi";
import { fontStyle } from "../utils/ClassUtils";
import PointSummary from "./pointTable/PointSummary";


const statItems = [
  { key: "tournamentCount", label: "Tournaments" },
  { key: "teamCount", label: "Teams" },
  { key: "playerCount", label: "Players" },
  { key: "runningPlayerCount", label: "Active Players" },
  { key: "umpireCount", label: "Umpires" },
  { key: "venueCount", label: "Venues" },
];

const Dashboard = () => {

  const { data, isLoading } = useGetSummaryQuery();
  const { data: results } = useGetLatestResultQuery(undefined);

  const summary = data?.data ?? null;


  const result = results?.data.result;
  const tournament = results?.data.tournament;


  return (
    <PageLayout>
      <section>
        <h1 className={`${fontStyle.pageTitle} font-bold text-font mb-6`}>Dashboard</h1>
        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl bg-muted animate-pulse"
                />
              ))}
          </div>
        )}

        {/* Empty/Fallback */}
        {!isLoading && !summary && (
          <div className="border border-muted rounded-xl p-6 text-center text-muted-foreground">
            No summary data found.
          </div>
        )}

        {/* Stats */}
        {!isLoading && summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statItems.map((item) => (
              <SummaryCard
                key={item.key}
                label={item.label}
                value={(summary as any)[item.key] ?? 0}
              />
            ))}
          </div>
        )}
      </section>
      {/* result card */}
      <section className="my-10 md:my-12 lg:my-20">
        <ResultSummary result={result as any} tournament={tournament as any} />
      </section>
      <SectionLayout>
        <PointSummary />
      </SectionLayout>
    </PageLayout>
  );
};

export default Dashboard;
