import { useNavigate, useParams } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import { useGetMyTeamQuery, useUpdateTeamLogoMutation } from "../../features/team/teamApi";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import { updateTLogo, updateTLogoType } from "../../utils/schema/teamSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import Buttons from "../../component/common/Buttons";
import { Edit2 } from "lucide-react";


const UpdateTeamLogo = () => {
  const goBack = useGoBack();

  const { teamId } = useParams();

  const navigate = useNavigate();

  const { data: team } = useGetMyTeamQuery(teamId, { skip: !teamId });
  const [updateTeamLogo, { isLoading }] = useUpdateTeamLogoMutation();

  // form method
  const methods = useForm<updateTLogoType>({
    resolver: zodResolver(updateTLogo),
    mode: "onSubmit"
  });

  const handleSubmit = async (data: updateTLogoType) => {
    const loadingId = LoadingToast({ msg: "Wait few momment! Uploading...", duration: 12000 });
    try {
      const formData = new FormData();
      if (data) {
        formData.append("teamLogo", data.teamLogo);
      };
      // update photo
      await updateTeamLogo({ teamId, formData }).unwrap();
      toast.dismiss(loadingId);
      SuccessToast({ msg: "Team Logo updated Successfully" })
      methods.reset();
      navigate(`/dashboard/team/manage/${teamId}`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Update Team Logo Failed!" })
    }
  };



  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Blog details"
        title="Update blog name"
        subtitle="Pick a new name"
      />

      <div className="w-full max-w-3xl mx-auto bg-surface  py-12 px-6 rounded-lg shadow">
        <div>
          <h2 className="text-font font-semibold font-inter">Current Photo:</h2>
          <img src={Array.isArray(team?.teamLogo) ? team?.teamLogo[0] : team?.teamLogo} alt="blog photo" loading="lazy"
            className="w-full h-[220px] object-scale-down object-center transition-transform duration-300 hover:scale-105"
          />
        </div>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 paddingX"
        >
          <PhotoInput label="Image" name="teamLogo" />
          <Buttons className="rounded-md" loading={isLoading} iconRight={<Edit2 size={16} />} disabled={isLoading}>
            Update Photo
          </Buttons>
        </FormContainer>
      </div>
    </PageLayout>
  )
}

export default UpdateTeamLogo;