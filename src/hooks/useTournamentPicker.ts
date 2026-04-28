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

  const [selected, setSelected] = useState<PickerItem | null>(null);

  // active id — selected overrides latest
  const activeTournamentId = selected?._id ?? latestId;

  const handleSelect = (item: PickerItem) => setSelected(item);

  const handleClear = () => setSelected(null);

  const tournaments = (tList?.data ?? []).map((t: any) => ({
    _id: t._id,
    name: t.tournamentName,
  }));

  return {
    activeTournamentId,
  selected,
  tournaments,
  handleSelect,
  handleClear,
  isLoading: latestLoading || tLoading,
  latestTournamentId: latestId,        
  latestTournamentName: latestTournament?.data?.tournamentName,
  };
};
