import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi";

// usePriorityTournament.ts
// const PRIORITY = ["upcoming", "ongoing", "completed"] as const;

export const usePriorityTournament = () => {
  const { data: t1, isLoading: l1 } = useLatestTournamentQuery({ status: "upcoming" });
  const { data: t2, isLoading: l2 } = useLatestTournamentQuery({ status: "ongoing" },   { skip: !!t1?.data });
  const { data: t3, isLoading: l3 } = useLatestTournamentQuery({ status: "completed" }, { skip: !!t1?.data || !!t2?.data });

  return {
    tournament: t1 ?? t2 ?? t3,
    isLoading: l1 || l2 || l3,
  };
};