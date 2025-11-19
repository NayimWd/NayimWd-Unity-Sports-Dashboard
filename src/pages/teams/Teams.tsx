import PageLayout from "../../component/layout/PageLayout"
import { useGetTeamsQuery } from "../../features/team/teamApi"

const Teams = () => {

 const {data} = useGetTeamsQuery();

 console.log(data)

  return (
    <PageLayout>
      Teams
    </PageLayout>
  )
}

export default Teams;