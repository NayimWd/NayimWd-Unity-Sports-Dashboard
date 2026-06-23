import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import { useGoBack } from "../../hooks/useGoBack";
import { useScheduleTeamQuery } from "../../features/schedule/scheduleApi";

const UpdateTeam = () => {
    const goBack = useGoBack();

   const { scheduleId, matchId  } = useParams();

     // fetch team 
    const {data } = useScheduleTeamQuery({scheduleId});

    // console.log(data.data);

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="schedule"
        title="Update Team"
        subtitle="Pick Team"
      />

      </PageLayout>
  )
}

export default UpdateTeam