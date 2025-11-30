import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { useGetTournamentDetailsQuery, useUpdateTournamentPhotoMutation } from "../../features/tournament/tournamentApi";
import { fontStyle } from "../../utils/ClassUtils";
import { useForm } from "react-hook-form";
import { TUpdateTournamentPhoto, updateTournamentPhotoSchema } from "../../utils/schema/tournamentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";

const UpdatePhoto = () => {
  const goBack = useGoBack();
  const navigate = useNavigate();

  // extract id from params
  const { id } = useParams();

  // fetch tournament details
  const { data } = useGetTournamentDetailsQuery(id as string);

  const tournament = data?.data;

  // update photo apiSlice 
  const [updateTournamentPhoto, { isLoading }] = useUpdateTournamentPhotoMutation();

  const methods = useForm<TUpdateTournamentPhoto>({
    resolver: zodResolver(updateTournamentPhotoSchema),
    mode: "onSubmit"
  });

  const handleSubmit = async (data: TUpdateTournamentPhoto) => {
    const loadingId = LoadingToast({ msg: "Wait few momment! Uploading...", duration:12000});
    try {
      const formData = new FormData();
      if (data?.photo) {
        formData.append("photo", data.photo);
      };

      await updateTournamentPhoto({
        id,
        data: formData
      }).unwrap();

      toast.dismiss(loadingId);
      SuccessToast({ msg: "photo updated Successfully" })
      methods.reset();
      navigate(`/dashboard/tournament/manage`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Tournament photo Update Failed!" })
    }
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <h1 className={`${fontStyle.pageTitle} text-center  font-semibold text-font font-merriweather`}>Edit Photo</h1>
      <div>
        <h2 className="text-font font-semibold font-inter">Current Photo:</h2>
        <img src={tournament?.photo} alt="blog photo" loading="lazy"
          className="w-full h-[420px] object-scale-down object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg"
        >
          <PhotoInput name="photo" label="photo"/>
          <Buttons iconRight={<Edit2 size={16} />} disabled={isLoading}>
            Update Photo
          </Buttons>
        </FormContainer>
      </SectionLayout>

    </PageLayout>
  )
}

export default UpdatePhoto