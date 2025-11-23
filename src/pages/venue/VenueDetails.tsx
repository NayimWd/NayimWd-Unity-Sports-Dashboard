import { useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetVenueDetailsQuery } from "../../features/venue/venueApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import SectionLayout from "../../component/layout/SectionLayout";
import Badge from "../../component/ui/Badge";
import Card from "../../component/common/card/Card";

const fallbackImg = "/lightImg.jpeg";

const VenueDetails = () => {
  const { venueId } = useParams();

  const goBack = useGoBack();

  const { data, isError } = useGetVenueDetailsQuery(
    venueId as string
  );

  const venue = data?.data;



  // Error state
  if (isError || !venue?._id) {
    return (
      <PageLayout>
        <BackButton onClick={goBack}>Back</BackButton>
        <p className="text-center text-lg text-red-500 mt-10">
          Failed to load venue details
        </p>
      </PageLayout>
    );
  }


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>

      {/* hero section  */}
      <SectionLayout className="mt-6 relative bg-transparent">
        <img
          src={venue.photo}
          alt={venue.name}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = fallbackImg)}
          className="w-full h-52 sm:h-64 object-cover rounded-xl opacity-95"
        />

        {/*  gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/25 to-black/65 flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-extrabold drop-shadow-lg">
              {venue.name}
            </h1>
            <p className="text-lg opacity-90">{venue.city}</p>
          </div>
        </div>
      </SectionLayout>

      {/* badge */}
      <div className="mt-10 flex flex-wrap gap-3">
        {venue.city && <Badge variant="success">{venue.city}</Badge>}
        {venue.features && <Badge variant="outline">{venue.features}</Badge>}
      </div>

      {/*  card with details  */}
      <Card className="mt-8 p-6 bg-surface shadow rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Venue Information</h3>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted">Venue Name</p>
            <p className="font-medium">{venue.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted">City</p>
            <p className="font-medium">{venue.city}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-muted">Location</p>
            <p className="font-medium leading-relaxed">{venue.location}</p>
          </div>

          <div>
            <p className="text-sm text-muted">Features</p>
            <p className="font-medium capitalize">{venue.features}</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
};

export default VenueDetails;