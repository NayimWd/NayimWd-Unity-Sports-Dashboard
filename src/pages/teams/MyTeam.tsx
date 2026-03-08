import { Calendar, Users } from "lucide-react";
import Card from "../../component/common/card/Card";
import PageLayout from "../../component/layout/PageLayout"
import { useGetMyTeamQuery } from "../../features/team/teamApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { Link } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import { fontStyle } from "../../utils/ClassUtils";



const MyTeam = () => {
  const goBack = useGoBack();

  const { data: team } = useGetMyTeamQuery({});


  return (
    <PageLayout>
  <BackButton onClick={goBack}>Go Back</BackButton>

  <div className="max-w-4xl mx-auto space-y-6 px-2 sm:px-0">

    {/* Page Header */}
    <div className="space-y-1">
      <h1 className={`${fontStyle.pageTitle} font-semibold text-font`}>My Team</h1>
      <p className="text-sm text-subtext">View and manage your registered team.</p>
    </div>

    {/* Team Card */}
    <Card className="relative overflow-hidden bg-surface border border-border rounded-2xl p-0">

      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-primary" />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Team Info */}
          <div className="flex items-center gap-4">

            <div className="relative shrink-0">
              <img
                src={team?.teamLogo}
                alt={team?.teamName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-border shadow-md"
                loading="lazy"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold text-font leading-tight">
                {team?.teamName}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-subtext">

                <span className="flex items-center gap-1.5 bg-subSurface px-2.5 py-1 rounded-full">
                  <Users size={13} className="text-primary" />
                  {team?.playerCount} Players
                </span>

                <span className="flex items-center gap-1.5 bg-subSurface px-2.5 py-1 rounded-full">
                  <Calendar size={13} className="text-primary" />
                  {team?.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'N/A'}
                </span>

              </div>
            </div>

          </div>

          {/* Manage Button */}
          <Link to={`/team/manage/${team?._id}`} className="sm:shrink-0">
            <Buttons size="sm" className="w-full sm:w-auto gap-2 rounded">
              Manage Team
            </Buttons>
          </Link>

        </div>
      </div>

    </Card>

  </div>
</PageLayout>
  )
}

export default MyTeam;