import { useForm } from "react-hook-form";
import FormContainer from "../../component/common/Form/FormContainer";
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout";
import { useCreateVenueMutation } from "../../features/venue/venueApi";
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils";
import { createVenueSchema, createVenueType } from "../../utils/schema/venueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../component/common/input/TextInput";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import DropdownInput from "../../component/common/input/DropdownInput";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import { Plus } from "lucide-react";

const Createvenue = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  // venue create api
  const [createVenue, { isLoading }] = useCreateVenueMutation();


  // handle form 
  const methods = useForm<createVenueType>({
    resolver: zodResolver(createVenueSchema),
    mode: "onSubmit"
  });

  const handleSubmit = async (data: createVenueType) => {
    const toastId = LoadingToast({ msg: "Creating Venue..." });

    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("location", data.location);
      formData.append("features", data.features);

      await createVenue(formData).unwrap();
      // console.log(formData)

      toast.dismiss(toastId);
      SuccessToast({ msg: "Venue created successfully!" });
      methods.reset();
      navigate("/dashboard/venue");
    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Failed to create venue" });
    }
  };

  // feature array
  let featuresOption = [
    { label: "Indoor", value: "indoor" },
    { label: "Outdoor", value: "outdoor" },
    { label: "Floodlight", value: "floodlight" },
  ];

  return (
    <PageLayout>
      <BackButton className="mb-5" onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-center text-font`}>Create Venue</h1>
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-7 lg:px-10"
        >
          <PhotoInput label="Venue Image" name="photo" />
          <TextInput label="Venue Name" name="name" placeholder="Enter venue name" />
          <TextInput label="City" name="city" placeholder="Enter city name" />
          <TextInput label="Location" name="location" placeholder="Enter exact location" />
          <DropdownInput label="Select a feature" name="features" placeholder="Select an option" options={featuresOption} />
          <Buttons disabled={isLoading} iconRight={<Plus size={16} />} variant="primary" className=" rounded">Create</Buttons>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default Createvenue;