import VenueCard from "../../component/common/card/VenueCard";
import PageLayout from "../../component/layout/PageLayout"
import EmptyData from "../../component/ui/EmptyData";
import { useGetVenueQuery } from "../../features/venue/venueApi"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";

const Venues = () => {
  const goBack = useGoBack();
  const { data, isError, refetch } = useGetVenueQuery();


  let content = null;

  // handle error 
  if (isError)
    content = (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-lg text-red-500 font-medium">
            Failed to load venues.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded bg-primary text-white"
          >
            Retry
          </button>
        </div>
      </PageLayout>
    ); 
    if(!data?.data.venues?.length){
      content = (
        <EmptyData message="Venue Not found!"/>
      )
    } else {
      content = <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">
        {data?.data.venues.map((venue) => (
          <VenueCard
            key={venue._id}
            venue={venue}
          />
        ))}
      </div>
    }


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
        <h1 className={`${fontStyle.pageTitle} text-font text-center`}>All Venue</h1>
      <div className="flex justify-between items-center mt-8">
        <h2 className={`${fontStyle.SectionHeading} text-font`}>
          Venues
        </h2>
        <p className="text-lg text-muted">Total Venue: {data?.data.total ? data?.data.total : 0}</p>
      </div>
      {
        content
      }
    </PageLayout>
  )
}

export default Venues