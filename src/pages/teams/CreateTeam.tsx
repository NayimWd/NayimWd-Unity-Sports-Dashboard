import PageLayout from "../../component/layout/PageLayout"
import { useGetAvailablePlayerProfileQuery } from "../../features/player/playerApi"

const CreateTeam = () => {
  const {data} = useGetAvailablePlayerProfileQuery("");

  console.log(data)

  return (
    <PageLayout>CreateTeam</PageLayout>
  )
}

export default CreateTeam