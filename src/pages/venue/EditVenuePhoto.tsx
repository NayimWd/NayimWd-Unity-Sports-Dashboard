import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { fontStyle } from "../../utils/ClassUtils";
import SectionLayout from "../../component/layout/SectionLayout";
import { TUpdateVenuePhoto, updateVenuePhotoSchema } from "../../utils/schema/venueSchema";
import { useGetVenueDetailsQuery, useUpdateVenuePhotoMutation } from "../../features/venue/venueApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import { Edit2 } from "lucide-react";
import Buttons from "../../component/common/Buttons";
import toast from "react-hot-toast";


const EditVenuePhoto = () => {
  const goBack = useGoBack();
  // get blog id
  const {  venueId }: any = useParams();
  const navigate = useNavigate();

  // get venue detals
  const { data } = useGetVenueDetailsQuery(venueId);
  // get api slice for update photo
  const [updateVenuePhoto, { isLoading }] = useUpdateVenuePhotoMutation();

  const method = useForm<TUpdateVenuePhoto>({
    resolver: zodResolver(updateVenuePhotoSchema),
    mode: "onSubmit"
  });

  // submit function 
  const handleSubmit = async (data: TUpdateVenuePhoto) => {
    const toastId = LoadingToast({ msg: "Updating Venue Photo" });

    try {
      const formData = new FormData();
      if (data.photo) {
        formData.append("photo", data.photo);
      };
      // update photo
      await updateVenuePhoto({
        venueId,
        data: formData
      }).unwrap();

      toast.dismiss(toastId);
        SuccessToast({ msg: "Photo Update Successfully!" });
      navigate("/dashboard/venue/manage");
      method.reset();
    } catch (error) {
      toast.dismiss(toastId);
      ErrorToast({ msg: "Update Venue Failed!" })
    }
  }


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-center text-font font-merriweather my-6`}>Edit Venue Photo</h1>
      <SectionLayout>
        {/* current photo */}
         <div>
          <h2 className="text-font font-inter font-semibold mb-3">
            Current Photo
          </h2>

          <img
            src={data?.data.photo}
            alt={data?.data.name}
            loading="lazy"
            className="w-full  md:w-[90%] lg:w-[60%] h-[150px] sm:h-[280px] lg:h-[300px] object-cover rounded-xl aspect-video shadow-lg transition-all duration-300 hover:scale-[1.02] mx-auto"
          />
        </div>
        {/* form */}
        <FormContainer
          methods={method}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX"
        >
          <PhotoInput label="Image" name="photo" />
          <Buttons iconRight={<Edit2 size={16} />} disabled={isLoading}>
            Update Photo
          </Buttons>
        </FormContainer>
      </SectionLayout>

    </PageLayout>
  );
};

export default EditVenuePhoto;