
import { useLatestTournamentQuery } from "../features/tournament/tournamentApi";

const Dashboard = () => {

  const { data: latestTournament } = useLatestTournamentQuery({});

  console.log(latestTournament, "latest tournament data")

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-font">Dashboard</h1>
        
    </div>
  );
};

export default Dashboard;
