import VenueCard from "../../component/common/card/VenueCard";
import VenueCardSkeleton from "../../component/common/skeleton/VenueCardSkeleton";
import PageLayout from "../../component/layout/PageLayout"
import { useGetVenueQuery } from "../../features/venue/venueApi"
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";

const Venues = () => {
  const goBack = useGoBack();
  const { data, isLoading, isError, refetch } = useGetVenueQuery();

  // handle loading 
  if (isLoading)
    return (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </div>
      </PageLayout>
    );


  // handle error 
  if (isError || !data?.data.venues?.length)
    return (
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

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <div className="flex justify-between items-center mt-8">
        <h1 className={`${fontStyle.SectionHeading} text-font`}>
          Venues
        </h1>
        <p className="text-lg text-muted">Total Venue: {data?.data.total}</p>
      </div>
      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">
        {data?.data.venues.map((venue) => (
          <VenueCard
            key={venue._id}
            venue={venue}
          />
        ))}
      </div>
    </PageLayout>
  )
}

export default Venues