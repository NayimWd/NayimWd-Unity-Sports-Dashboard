import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGetVenueDetailsQuery, useUpdateVenueDetailsMutation } from "../../features/venue/venueApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import SectionLayout from "../../component/layout/SectionLayout";
import { useForm } from "react-hook-form";
import { TUpdateVenueDtails, updateVenueDetailsSchema } from "../../utils/schema/venueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import DropdownInput from "../../component/common/input/DropdownInput";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";
import { useEffect } from "react";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";

const EditVenueDetails = () => {

  const goBack = useGoBack();
  // get venue id from params
  const { venueId }: any = useParams();
  // navigate
  const navigate = useNavigate();

  // fetch venue details by venue id
  const { data } = useGetVenueDetailsQuery(venueId);
  // venue  update api
  const [updateVenueDetails, { isLoading }] = useUpdateVenueDetailsMutation(venueId);

  // set default value on inputs
  const defaultDetails = data?.data;
  useEffect(() => {
    if (defaultDetails) {
      method.reset({
        name: defaultDetails.name,
        city: defaultDetails.city,
        location: defaultDetails.location,
        features: defaultDetails.features
      })
    };
  }, [data])

  const method = useForm<TUpdateVenueDtails>({
    resolver: zodResolver(updateVenueDetailsSchema),
    mode: "onSubmit"
  })

  const handleSubmit = async (data: TUpdateVenueDtails) => {
    const toastId = LoadingToast({ msg: "Updating venue Details" });

    try {
      // update venue deatils
      await updateVenueDetails({
        venueId,
        data: {
          name: data.name,
          city: data.city,
          location: data.location,
          features: data.features
        }
      }).unwrap();

      toast.dismiss(toastId),
        SuccessToast({ msg: "Venue Update Successfully!" })
      navigate("/dashboard/venue/manage")

    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Update Venue Failed!" })
    }
  }

  // feature array
  let featuresOption = [
    { label: "Indoor", value: "indoor" },
    { label: "Outdoor", value: "outdoor" },
    { label: "Floodlight", value: "floodlight" },
  ];

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-center text-font font-merriweather`}>Edit Venue Details</h1>
      <SectionLayout>
        <FormContainer
          methods={method}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg"
        >
          <TextInput label="Venue Name" name="name" placeholder="Enter venue name" />
          <TextInput label="City" name="city" placeholder="Enter city name" />
          <TextInput label="Location" name="location" placeholder="Enter exact location" />
          <DropdownInput label="Select a feature" name="features" placeholder="Select an option" options={featuresOption} />
          <Buttons disabled={isLoading} iconRight={<Edit2 size={16} />} variant="primary" className=" rounded">Edit</Buttons>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default EditVenueDetails