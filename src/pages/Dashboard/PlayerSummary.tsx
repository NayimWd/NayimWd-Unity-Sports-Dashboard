import { Link } from "react-router-dom";
import { User, ArrowRight } from "lucide-react";
import { useGetPlayerProfileQuery } from "../../features/profile/profileSlice";

const PlayerSummary = () => {
  const { data: player, isLoading, isError } = useGetPlayerProfileQuery(undefined);
 

  // loading
  if (isLoading) return (
    <div className="rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="h-1 bg-subSurface" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-subSurface flex-shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-28 rounded bg-subSurface" />
            <div className="h-3 w-20 rounded bg-subSurface" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-subSurface" />
          ))}
        </div>
      </div>
    </div>
  );

  // error / no profile
  if (isError || !player) return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="h-1 w-full bg-gradient-primary" />
      <div className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-subSurface flex items-center justify-center">
          <User size={16} className="text-muted" />
        </div>
        <div>
          <p className="text-sm font-medium text-font">No player profile found</p>
          <p className="text-xs text-muted mt-0.5">Set up your profile to appear here.</p>
        </div>
        <Link to="/dashboard/profile">
          <button className="text-xs font-medium text-primary hover:underline mt-1">
            Create Profile →
          </button>
        </Link>
      </div>
    </div>
  );

  const age = player.DateOfBirth
    ? new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear()
    : null;

  const statCards = [
    { label: "Role",          value: player.player_role,  bg: "bg-blue-500/10",    color: "text-primary"    },
    { label: "Batting",       value: player.batingStyle,  bg: "bg-yellow-500/10",  color: "text-yellow-600" },
    { label: "Bowling Arm",   value: player.bowlingArm,   bg: "bg-orange-500/10",  color: "text-orange-500" },
    { label: "Bowling Style", value: player.bowlingStyle, bg: "bg-purple-500/10",  color: "text-purple-600" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="h-1 w-full bg-gradient-primary" />
      <div className="p-5 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {player.userId?.photo ? (
              <img
                src={player.userId.photo}
                alt={player.userId.name}
                className="w-12 h-12 rounded-xl object-cover border border-border flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-subSurface flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-muted" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-font">{player.userId?.name}</p>
              <p className="text-xs text-muted mt-0.5">
                {age ? `${age} years old` : "Player"}
              </p>
            </div>
          </div>
          <Link to="/dashboard/profile">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                               font-medium bg-blue-500/10 text-primary hover:bg-blue-500/20
                               border border-blue-500/20 transition-colors">
              Profile <ArrowRight size={12} />
            </button>
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map(({ label, value, color }) => (
            <div key={label} className="bg-subSurface rounded-xl p-3.5 space-y-1.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                {label}
              </p>
              <p className={`text-sm font-medium capitalize ${color}`}>{value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PlayerSummary;