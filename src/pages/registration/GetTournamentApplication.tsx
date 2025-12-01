import { useGetRegisterApplicationQuery } from "../../features/registration/registrationApi";
import { useLatestTournamentQuery } from "../../features/tournament/tournamentApi"

const TournamentApplications = () => {

    // get  tournament id
    const { data } = useLatestTournamentQuery();

    // get application by that id
    const { data: applications } = useGetRegisterApplicationQuery({
        id: data?.data._id,
        status: "approved"
    },
        {
            skip: !data?.data._id
        }
    );

    console.log(applications)


    return (
        <div>

        </div>
    )
}

export default TournamentApplications