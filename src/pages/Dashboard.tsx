import {  Suspense } from "react";
import ResultSummary from "../component/common/banner/ResultSummary";
import PageLayout from "../component/layout/PageLayout";
import SectionLayout from "../component/layout/SectionLayout";
import { useCurrentUserQuery } from "../features/auth/authApi";
import { useGetLatestResultQuery } from "../features/dashboard/summaryApi";
import { fontStyle } from "../utils/ClassUtils";
import PointSummary from "./pointTable/PointSummary";
import { useDashboardSummary } from "./Dashboard/StrategyConfig";


const Dashboard = () => {
  const { data: user } = useCurrentUserQuery();
  const { data: results } = useGetLatestResultQuery(undefined);

  const result = results?.data.result;
  const tournament = results?.data.tournament;

  const { RoleSummary } = useDashboardSummary(user?.role);

  return (
    <PageLayout>
      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className={`${fontStyle.pageTitle} text-font font-medium`}>Dashboard</h1>
          <p className="text-sm text-muted mt-0.5">Sports Club Management — Season 2026</p>
        </div>
        <span className="text-xs text-muted bg-subSurface border border-border px-3 py-1.5 rounded-full">
          Live
        </span>
      </div>
      {/*  summary */}
      {RoleSummary && (
        <section className="mb-8">
          <p className={`${fontStyle.SectionHeading} text-subtext m-2`}>My Overview</p>
          <Suspense fallback={<div className="h-32 rounded-2xl bg-subSurface animate-pulse" />}>
            <RoleSummary />
          </Suspense>
        </section>
      )}
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
