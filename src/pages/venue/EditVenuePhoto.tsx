import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";

const EditVenuePhoto = () => {
  const goBack = useGoBack();

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-center text-font font-merriweather`}>Edit Venue Details</h1>

    </PageLayout>
  );
};

export default EditVenuePhoto;