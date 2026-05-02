import { Crown, UserMinus } from "lucide-react"
import cn from "../../../utils/cn"
import { PlayerAction } from "../ManageTeam";


interface IPlayer {
  players: any,
  isManager: boolean,
  onRemove: (player: PlayerAction) => void;
  onMakeCaptain: (player: PlayerAction) => void;
}

function Players({ players, isManager, onRemove, onMakeCaptain }: IPlayer) {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          Squad
        </p>
        <span className="text-xs text-muted bg-subSurface px-2.5 py-1 rounded-full">
          {players.length} players
        </span>
      </div>
      <div className="divide-y divide-border">
        {players.map((player: any) => (
          <div key={player._id} className="flex items-center gap-3 px-5 py-3
                                                   hover:bg-subSurface transition-colors">
            <img
              src={player.photo}
              alt={player.name}
              className="w-8 h-8 rounded-lg object-cover border border-border flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-font truncate">{player.name}</p>
              <p className="text-xs text-muted capitalize">{player.role}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {player.isCaptain && (
                <Crown size={12} className="text-yellow-500" />
              )}
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                player.status === "active"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : "bg-subSurface text-muted"
              )}>
                {player.status}
              </span>
              {
                isManager && (
                  <div className="flex items-center gap-1 ml-1">
                    {!player.isCaptain && (
                      <button
                        onClick={() => onMakeCaptain(player)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center
                                     text-muted hover:text-yellow-600 hover:bg-yellow-50
                                     dark:hover:bg-yellow-900/20 transition-colors"
                        title="Make captain"
                      >
                        <Crown size={13} />
                      </button>
                    )}
                    <button
                      onClick={() => onRemove(player)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center
                                   text-muted hover:text-toastErrorText hover:bg-toastErrorBg
                                   transition-colors"
                      title="Remove player"
                    >
                      <UserMinus size={13} />
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Players;