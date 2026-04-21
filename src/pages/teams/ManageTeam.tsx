import { useParams } from "react-router-dom"
import PageLayout from "../../component/layout/PageLayout"
import { useGetTeamDetailsQuery, useMakeCaptainMutation, useRemovePlayerMutation } from "../../features/team/teamApi";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import ManageTeamSkeleton from "./teamSkeleton/ManageTeamSkeleton";
import Hero from "./components/Hero";
import Players from "./components/Players";
import Captain from "./components/Captain";
import { useState } from "react";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import ConfirmModal from "../../component/ui/modal/ConfirmModal";
import { UserPlus } from "lucide-react";
import AddPlayerModal from "./Addplayer";

export interface PlayerAction {
  _id: string;
  name: string;
  photo: string;
}


type ModalType = "remove" | "captain" | null;

const ManageTeam = () => {
  const { teamId } = useParams();

  const goBack = useGoBack();

  const [addPlayerOpen, setAddPlayerOpen] = useState(false);

  const { data: currentUser } = useCurrentUserQuery();
  const { data: player, isLoading: pLoading, } = useGetTeamDetailsQuery(teamId, { skip: !teamId });

  //  remove player and add captain mutation
  const [removePlayer, { isLoading: removing }] = useRemovePlayerMutation();
  const [makeCaptain, { isLoading: makingCaptain }] = useMakeCaptainMutation();

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerAction | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const isManager = currentUser?.role === "manager";
  const team = player?.team;
  const players = player?.players ?? [];
  const captain = players.find((p: any) => p.isCaptain);


  // modal handler
  const openModal = (type: ModalType, player: PlayerAction) => {
    setSelectedPlayer(player);
    setModalType(type)
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setModalType(null);
  };

  const handleConfirm = async () => {
    if (!selectedPlayer || !teamId) return;

    const toastId = LoadingToast({ msg: "Action in-progress" })

    try {
      if (modalType === "remove") {
        toast.dismiss(toastId);
        await removePlayer({ teamId, playerId: selectedPlayer._id }).unwrap();
        SuccessToast({ msg: `${selectedPlayer.name} removed from team` });
      }
      if (modalType === "captain") {
        toast.dismiss(toastId);
        await makeCaptain({ teamId, playerId: selectedPlayer._id }).unwrap();
        SuccessToast({ msg: `${selectedPlayer.name} is now captain` });
      }
      closeModal();
    } catch {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Action Failed. please try again" })
    }

  };



  return (
    <PageLayout>
      <BackButton onClick={goBack}>Go Back</BackButton>

      <div className="max-w-3xl mx-auto mt-6 space-y-6 px-2 sm:px-0">

        {/* loading */}
        {pLoading && (
          <ManageTeamSkeleton />
        )}

        {!pLoading && team && (
          <>
            {/* team hero */}
            <Hero
              team={team}
              isManager={isManager}
              teamId={teamId}
            />

            {!pLoading && isManager && (player?.team?.playerCount ?? 0) < 18 && (
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                  <UserPlus size={13} className="text-primary" />
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Add Player
                  </p>
                </div>
                <div className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-font">Expand your squad</p>
                    <p className="text-xs text-muted mt-0.5">
                      {player?.team?.playerCount ?? 0} / 18 players — {18 - (player?.team?.playerCount ?? 0)} spots remaining
                    </p>
                  </div>
                  <button
                    onClick={() => setAddPlayerOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
                   bg-blue-500/10 text-primary hover:bg-blue-500/20
                   border border-blue-500/20 transition-colors flex-shrink-0"
                  >
                    <UserPlus size={12} /> Browse Players
                  </button>
                </div>
              </div>
            )}

            {/* captain */}
            {captain && (
              <Captain
                captain={captain}
              />
            )}

            {/* clayers */}
            <Players players={players}
              isManager={isManager}
              onMakeCaptain={(player: any) => openModal("captain", player)}
              onRemove={(player) => openModal("remove", player)}
            />
          </>
        )}

      </div>
      {/* confirm modal */}
      <ConfirmModal
        isOpen={!!modalType}
        onOpenChange={(open) => { if (!open) closeModal(); }}
        title={modalType === "remove" ? "Remove Player" : "Make Captain"}
        description={
          modalType === "remove"
            ? `Remove ${selectedPlayer?.name} from ${team?.teamName}?`
            : `Make ${selectedPlayer?.name} captain of ${team?.teamName}?`
        }
        onConfirm={handleConfirm}
        loading={removing || makingCaptain}
      />
      {/* add player modal */}
      {
        addPlayerOpen && <AddPlayerModal
          isOpen={addPlayerOpen}
          onOpenChange={setAddPlayerOpen}
          teamId={teamId!}
        />
      }

    </PageLayout>
  )
}

export default ManageTeam