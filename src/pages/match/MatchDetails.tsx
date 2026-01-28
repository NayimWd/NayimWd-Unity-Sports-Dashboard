import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import { useGetMatchDetailsQuery } from "../../features/match/matchApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import {
  Award,
  Calendar,
  Clock,
  MapPin,
  RadioTower,
  Trophy,
  Tv,
} from "lucide-react";
import Card from "../../component/common/card/Card";
import cn from "../../utils/cn";
import { fontStyle } from "../../utils/ClassUtils";


const MatchDetails = () => {
  const goBack = useGoBack();

  const { matchId } = useParams();

  const { data, isLoading } = useGetMatchDetailsQuery(matchId, { skip: !matchId });

  const details = data?.data;

  if (isLoading) {
    return (
      <PageLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-subSurface rounded-xl" />
          <div className="h-40 bg-subSurface rounded-xl" />
        </div>
      </PageLayout>
    );
  }

  if (!details) return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
        <div className={`${fontStyle.pageTitle} text-center text-font my-10`}></div>
    </PageLayout>
  );

  const { match, matchInfo, MatchResult } = details;
  const isCompleted = match.status === "completed";
  const isLive = match.status === "in-progress";

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      {/* Match Header Card */}
      <div className="flex w-full justify-center">
      <Card className="max-w-xl mt-10" variant="match" size="lg">
        <div className="flex flex-col gap-6">

          {/* Match Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Match #{match.matchNumber}
            </h1>

            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                isCompleted
                  ? "bg-green-500/10 text-green-600"
                  : isLive
                    ? "bg-orange-500/10 text-orange-600"
                    : "bg-blue-500/10 text-blue-600"
              )}
            >
              {match.status}
            </span>
          </div>

          {/* Teams */}
          <div className="grid grid-cols-1 items-center gap-4">
            {/* Team A */}
            <div className="flex items-center gap-3">
              <img
                src={match.teamA?.teamLogo}
                alt={match.teamA?.teamName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{match.teamA?.teamName} </p>
                {MatchResult?.teamA_stats && (
                  <p className="text-sm text-subtext">
                    {MatchResult.teamA_stats}
                  </p>
                )}
              </div>
            </div>

            <p className="text-center text-sm font-semibold text-subtext">
              VS
            </p>

            {/* Team B */}
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="font-semibold">{match.teamB?.teamName}</p>
                {MatchResult?.teamB_stats && (
                  <p className="text-sm text-subtext">
                    {MatchResult.teamB_stats}
                  </p>
                )}
              </div>
              <img
                src={match.teamB?.teamLogo}
                alt={match.teamB?.teamName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Result */}
          {isCompleted && MatchResult?.margin ? (
            <div className="flex items-center gap-2 bg-bg p-4 rounded-lg">
              <Trophy className="w-5 h-5 text-primary" />
              <p className="font-semibold text-primary">
               <span className="font bold mr-1"> {MatchResult.winner ? MatchResult.winner.teamName : ""} </span> {MatchResult.margin}
              </p>
            </div>
          )
          : 
          (
            <div className="flex items-center gap-2 bg-bg p-4 rounded-lg">
                <RadioTower className="w-5 h-5 text-primary" />
              <p className="font-semibold text-primary">
               {MatchResult.report ? MatchResult.report : ""}
              </p>
            </div>
          )
        }
        </div>
      </Card>
      </div>

      {/* Match Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 bg-surface p-5 rounded-md">

        {/* Schedule & Venue Card */}
        <Card>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Match Information</h3>
          </div>

          <div className="space-y-4">
            {matchInfo?.matchDate && (
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-bg/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-subtext uppercase tracking-wide mb-1">
                    Date
                  </p>
                  <p className="text-base font-medium">{matchInfo.matchDate}</p>
                </div>
              </div>
            )}
            {matchInfo?.round && (
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-bg/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Tv className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-subtext uppercase tracking-wide mb-1">
                    Playing Round
                  </p>
                  <p className="text-base font-medium uppercase">{matchInfo.round}</p>
                </div>
              </div>
            )}

            {matchInfo?.matchTime && (
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-bg/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-subtext uppercase tracking-wide mb-1">
                    Time
                  </p>
                  <p className="text-base font-medium">{matchInfo.matchTime}</p>
                </div>
              </div>
            )}

            {matchInfo?.venueId && (
              <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-bg/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-subtext uppercase tracking-wide mb-1">
                    Venue
                  </p>
                  <p className="text-base font-medium">{matchInfo.venueId.location}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Officials & Awards Card */}
        <Card>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Officials & Awards</h3>
          </div>

          {MatchResult?.manOftheMatch ? (
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/20">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Man of the Match
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={MatchResult.manOftheMatch.photo ?? "/lightImg.jpeg"}
                    alt={MatchResult.manOftheMatch.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-500/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold mb-1">
                    {MatchResult.manOftheMatch.name}
                  </p>
                  <p className="text-sm text-subtext font-medium">
                    Outstanding Performance
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-muted/30 border border-border text-center">
              <Trophy className="w-12 h-12 text-muted mx-auto mb-3" />
              <p className="text-sm text-subtext font-medium">
                Awards will be announced after match completion
              </p>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}

export default MatchDetails;
