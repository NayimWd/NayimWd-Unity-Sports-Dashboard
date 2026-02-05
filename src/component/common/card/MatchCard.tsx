import { Calendar, Clock, RadioTower } from "lucide-react";
import cn from "../../../utils/cn"
import { TournamentMatch } from "../../../utils/types/matchTypes"
import Card from "./Card"
import { Link } from "react-router-dom";
import Buttons from "../Buttons";


export interface MatchCardProps {
  match: TournamentMatch,
  className?: string,
}

const MatchCard = ({ match, className }: MatchCardProps) => {
  const {
    teamA,
    teamB,
    status,
    matchSummary,
    previousMatches,
    matchNumber,
    _id
  } = match;

  const isCompleted = status === "completed";

  const getTeamLabel = (
    team?: typeof teamA,
    prevMatch?: string | null
  ) => {
    if (team?.teamName) return team.teamName;
    if (prevMatch) return `Winner of Match ${prevMatch}`;
    return "TBD";
  };

  return (
    <Card
      variant="match"
      className={cn(
        "hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* tags */}
      <Card.Tags>
        <span className="text-xs font-medium text-subtext">
          Match #{matchNumber}
        </span>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full capitalize",
            isCompleted
              ? "bg-green-500/10 text-green-600"
              : "bg-blue-500/10 text-blue-600"
          )}
        >
          {status}
        </span>
      </Card.Tags>

      <Card.Content className="gap-5 mt-8">
        {/* team info */}
        <div className="flex items-center justify-between gap-4">
          {/* team A info*/}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={teamA?.teamLogo ?? "/lightImg.jpeg"}
              alt={getTeamLabel(teamA, previousMatches?.matchA)}
              className="w-8 h-8 rounded-full object-contain"
              loading="lazy"
            />
            <span className="font-semibold text-font truncate">
              {getTeamLabel(teamA, previousMatches?.matchA)}
            </span>
          </div>

          <span className="text-xs font-semibold text-subtext">
            VS
          </span>

          {/* team B info*/}
          <div className="flex items-center gap-3 min-w-0 justify-end">
            <span className="font-semibold text-font truncate text-right">
              {getTeamLabel(teamB, previousMatches?.matchB)}
            </span>
            <img
              src={teamB?.teamLogo ?? "/lightImg.jpeg"}
              alt={getTeamLabel(teamB, previousMatches?.matchB)}
              className={cn(
                "w-8 h-8 rounded-full object-contain",
                !teamB && "opacity-60"
              )}
              loading="lazy"
            />
          </div>
        </div>

        {/* match info */}
        {isCompleted ? (
          <div className="rounded-lg bg-surface border border-border p-3 space-y-1">
            <p className="text-sm font-semibold text-primary">
             <span className="font-bold  mr-1">
              {matchSummary?.winner ? matchSummary?.winner.teamName : ""}
              </span>  
              {matchSummary?.margin}
            </p>
            <p className="text-xs text-subtext">
              {matchSummary?.teamA_stats} |{" "}
              {matchSummary?.teamB_stats}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-6 text-sm text-subtext">
            <div className="flex items-center gap-1">
              <RadioTower className="w-4 h-4" />
              <span>{matchSummary?.report}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{matchSummary?.matchDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{matchSummary?.matchTime}</span>
            </div>
          </div>
        )}
      </Card.Content>

      {/* footer */}
      <Card.Footer className="justify-end">
        <Link to={`/dashboard/match/${_id}`}>
          <Buttons size="sm" variant="primary">
            View details
          </Buttons>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default MatchCard