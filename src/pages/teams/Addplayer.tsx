import { useState } from "react";
import { useGetAvailablePlayerProfileQuery } from "../../features/player/playerApi";
import { useAddPlayerMutation } from "../../features/team/teamApi";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import RedixModal from "../../component/ui/modal/RedixModal";
import { AlertCircle, ChevronLeft, ChevronRight, UserPlus, Users } from "lucide-react";
import cn from "../../utils/cn";


interface Player {
  value: string;
  label: string;
  photo: string;
  role: string;
  bowlingStyle: string;
}

interface AddPlayerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: string;
}

const AddPlayerModal = ({ isOpen, onOpenChange, teamId }: AddPlayerModalProps) => {
  const [page, setPage] = useState(1);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetAvailablePlayerProfileQuery(
    { page, limit: 10 },
    { skip: !isOpen }
  );

  const [addPlayer] = useAddPlayerMutation();

  const players: Player[] = data?.data?.players ?? [];
  const pagination = data?.data?.pagination;
  const visiblePlayers = players.filter(p => !addedIds.includes(p.value));

  const handleAdd = async (player: Player) => {
    const toastId = LoadingToast({ msg: "Updating Blog Details..." });
    setLoadingId(player.value);
    try {

      await addPlayer({ teamId, playerId: player.value }).unwrap();
      setAddedIds(prev => [...prev, player.value]);
      toast.dismiss(toastId);
      SuccessToast({ msg: `${player.label} added` });
    } catch {
      toast.dismiss(toastId);
      ErrorToast({ msg: `Failed to add ${player.label}` });

    } finally {
      toast.dismiss(toastId);
      setLoadingId(null);
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) { setPage(1); setAddedIds([]); }
  };

  return (
    <RedixModal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title="Available Players"
      size="md"
      hideFooter
    >
      {/* Loading */}
      {isLoading && (
        <div className="space-y-2">
          {Array(5).fill(null).map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-subSurface animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="py-8 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-toastErrorBg flex items-center justify-center">
            <AlertCircle size={16} className="text-toastErrorText" />
          </div>
          <p className="text-sm text-font">Failed to load players</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && visiblePlayers.length === 0 && (
        <div className="py-8 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-subSurface flex items-center justify-center">
            <Users size={16} className="text-muted" />
          </div>
          <p className="text-sm font-medium text-font">No players available</p>
          <p className="text-xs text-muted">All available players have been added</p>
        </div>
      )}

      {/* List */}
      {!isLoading && !isError && visiblePlayers.length > 0 && (
        <div className="space-y-1.5">
          {visiblePlayers.map((player) => {
            const isAdding = loadingId === player.value;
            return (
              <div
                key={player.value}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                           border border-border hover:bg-subSurface transition-colors"
              >
                <img
                  src={player.photo}
                  alt={player.label}
                  className="w-9 h-9 rounded-lg object-cover border border-border flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-font truncate">{player.label}</p>
                  <p className="text-xs text-muted capitalize">
                    {player.role} · {player.bowlingStyle}
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(player)}
                  disabled={isAdding}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                    "transition-colors duration-150 flex-shrink-0",
                    isAdding
                      ? "bg-subSurface text-muted cursor-not-allowed"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  {isAdding ? "Adding..." : <><UserPlus size={12} /> Add</>}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors",
              page === 1 ? "text-muted cursor-not-allowed" : "text-subtext hover:bg-subSurface"
            )}
          >
            <ChevronLeft size={13} /> Prev
          </button>
          <span className="text-xs text-muted">{page} / {pagination.totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
            disabled={page === pagination.totalPages}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border transition-colors",
              page === pagination.totalPages ? "text-muted cursor-not-allowed" : "text-subtext hover:bg-subSurface"
            )}
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      )}
    </RedixModal>
  );
};

export default AddPlayerModal;