import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetPlayerDetailsQuery } from "../../features/player/playerApi";

const PlayerDetails = () => {

  const {playerId} = useParams();

 const {data} = useGetPlayerDetailsQuery(playerId);

 console.log(data)

  return (
    <PageLayout>PlayerDetails</PageLayout>
  )
};

export default PlayerDetails;