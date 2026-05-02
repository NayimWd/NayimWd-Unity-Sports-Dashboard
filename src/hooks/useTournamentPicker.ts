import { useState } from "react";
import {
  useLatestTournamentQuery,
  useSearchTournamentQuery,
} from "../features/tournament/tournamentApi";

interface PickerItem {
  _id: string;
  name: string;
  status?: string;
}

export const useTournamentPicker = () => {
  const { data: latestTournament, isLoading: latestLoading } =
    useLatestTournamentQuery(undefined);
  const { data: tList, isLoading: tLoading } =
    useSearchTournamentQuery(undefined);
  const latestId = latestTournament?.data?._id;
  const teamCount = latestTournament?.data?.teamCount;
  const [selected, setSelected] = useState<PickerItem | null>(null);

  // active id — selected overrides latest
  const activeTournamentId = selected?._id ?? latestId;
 
  const handleSelect = (item: PickerItem) => setSelected(item);

  const handleClear = () => setSelected(null);

  const tournaments = (tList?.data ?? []).map((t: any) => ({
    _id: t._id,
    name: t.tournamentName,
    status: t.status,
  }));

  const activeTournamentStatus = selected
  ? tournaments.find((t: any) => t._id === selected._id)?.status
  : latestTournament?.data?.status;

  return {
    activeTournamentId,
  selected,
  tournaments,
  handleSelect,
  handleClear,
  isLoading: latestLoading || tLoading,
  latestTournamentId: latestId,        
  latestTournamentName: latestTournament?.data?.tournamentName,
  teamCount,
  activeTournamentStatus,
  };
};
