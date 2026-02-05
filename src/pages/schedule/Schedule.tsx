import { Calendar, Clock } from "lucide-react";
import Card from "../../component/common/card/Card";
import PageLayout from "../../component/layout/PageLayout";
import { useGetSchedultQuery } from "../../features/schedule/scheduleApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import cn from "../../utils/cn";
import { Link } from "react-router-dom";
import Buttons from "../../component/common/Buttons";

const Schedule = () => {
  const goBack = useGoBack();

  // get letest tournament id based on point table
  const { data: tournament } = useLatestTournamentQuery();

  const tournamentId = tournament?.data._id;

  const { data } = useGetSchedultQuery({ tournamentId }, { skip: !tournamentId });

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-font text-center mt-5 ${fontStyle.pageTitle}`}>Tournament Matches</h1>
        <span className="text-sm text-subtext">
          Total Matches: {data?.total}
        </span>
      </div>

      {/* header */}
      {/* Schedule List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {data?.schedules.map((schedule) => {
          const teamA = schedule.teams?.teamA;
          const teamB = schedule.teams?.teamB;

          return (
            <Card
              key={schedule._id}
              variant="match"
              className="hover:-translate-y-1 transition-all duration-300 p-5"
            >
              {/* Top meta */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-subtext">
                  Match #{schedule.matchNumber}
                </span>

                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    schedule.status === "completed" &&
                    "bg-green-500/10 text-green-600",
                    schedule.status === "in-progress" &&
                    "bg-orange-500/10 text-orange-600",
                    schedule.status === "scheduled" &&
                    "bg-blue-500/10 text-blue-600"
                  )}
                >
                  {schedule.status}
                </span>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between gap-3">
                {/* Team A */}
                <div className="flex items-center gap-2">
                  <img
                    src={teamA?.teamLogo ?? "/lightImg.jpeg"}
                    alt={teamA?.teamName ?? "TBD"}
                    className="w-8 h-8 rounded-full object-contain"
                    loading="lazy"
                  />
                  <span className="font-semibold text-sm">
                    {teamA?.teamName ?? "TBD"}
                  </span>
                </div>

                <span className="text-xs font-semibold text-subtext">VS</span>

                {/* Team B */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {teamB?.teamName ?? "TBD"}
                  </span>
                  <img
                    src={teamB?.teamLogo ?? "/lightImg.jpeg"}
                    alt={teamB?.teamName ?? "TBD"}
                    className="w-8 h-8 rounded-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center justify-between text-xs text-subtext mt-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{schedule.matchDate}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{schedule.matchTime}</span>
                </div>
              </div>

              {/* Round */}
              <p className="mt-2 text-xs text-muted">
                {schedule.round}
              </p>

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <Link to={`/dashboard/match/${schedule.matchId}`}>
                  <Buttons size="sm" variant="primary" className="rounded">
                    Match Details
                  </Buttons>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

    </PageLayout>
  )
}

export default Schedule