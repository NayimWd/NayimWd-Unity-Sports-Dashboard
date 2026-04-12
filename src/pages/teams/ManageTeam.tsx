import { useParams } from "react-router-dom"
import PageLayout from "../../component/layout/PageLayout"

const ManageTeam = () => {
  const {teamId} = useParams();

  console.log(teamId);

  return (
    <PageLayout>ManageTeam</PageLayout>
  )
}

export default ManageTeam