import { Calendar, Eye, Settings, Users } from "lucide-react";
import Card from "../../component/common/card/Card";
import PageLayout from "../../component/layout/PageLayout"
import { useGetMyTeamQuery } from "../../features/team/teamApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { Link } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import { fontStyle } from "../../utils/ClassUtils";
import { useCurrentUserQuery } from "../../features/auth/authApi";



const MyTeam = () => {
  const goBack = useGoBack();
  // get user info 
  const { data: currentUser, isLoading } = useCurrentUserQuery();
  // fetch team
  const { data: team, isError } = useGetMyTeamQuery({});

  const isManager = currentUser?.role === "manager";

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Go Back</BackButton>

      <div className="max-w-3xl mx-auto space-y-6 px-2 sm:px-0 mt-6">

        {/* Header */}
        <div>
          <h1 className={`${fontStyle.pageTitle} font-medium text-font`}>My Team</h1>
          <p className="text-sm text-muted mt-0.5">
            {isManager ? "Manage your registered team." : "View your team details."}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-2xl border border-border overflow-hidden animate-pulse">
            <div className="h-1 bg-subSurface" />
            <div className="p-6 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-subSurface flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 rounded bg-subSurface" />
                <div className="h-3 w-24 rounded bg-subSurface" />
              </div>
            </div>
          </div>
        )}

        {/* No team */}
        {!isLoading && isError && (
          <Card className="border border-border rounded-2xl p-0 overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-10 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-subSurface flex items-center justify-center">
                <Users size={20} className="text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-font">No team found</p>
                <p className="text-xs text-muted mt-1">
                  {isManager
                    ? "You haven't created a team yet."
                    : "You haven't joined a team yet."}
                </p>
              </div>
              {isManager && (
                <Link to="/dashboard/team/create">
                  <Buttons size="sm" variant="primary" className="rounded-lg mt-1">
                    Create Team
                  </Buttons>
                </Link>
              )}
            </div>
          </Card>
        )}

        {/* Team card */}
        {!isLoading && !isError && team && (
          <Card className="border border-border rounded-2xl p-0 overflow-hidden">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                {/* Team info */}
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={team.teamLogo}
                      alt={team.teamName}
                      className="w-14 h-14 rounded-xl object-cover border border-border"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500
                                     border-2 border-surface rounded-full" />
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="text-base font-medium text-font leading-tight">
                      {team.teamName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 text-xs text-subtext
                                       bg-subSurface px-2.5 py-1 rounded-full">
                        <Users size={11} className="text-primary" />
                        {team.playerCount} Players
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-subtext
                                       bg-subSurface px-2.5 py-1 rounded-full">
                        <Calendar size={11} className="text-primary" />
                        {new Date(team.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA — role based */}
                <Link
                  to={isManager
                    ? `/dashboard/team/manage/${team._id}`
                    : `/dashboard/team/${team._id}`}
                  className="sm:flex-shrink-0"
                >
                  <Buttons
                    size="sm"
                    variant="primary"
                    className="w-full sm:w-auto rounded-lg flex items-center gap-2"
                    iconLeft={isManager ? <Settings size={13} /> : <Eye size={13} />}
                  >
                    {isManager
                      ? " Manage Team"
                      : "Team Details"}
                  </Buttons>
                </Link>

              </div>
            </div>
          </Card>
        )}

      </div>
    </PageLayout>
  )
}

export default MyTeam;