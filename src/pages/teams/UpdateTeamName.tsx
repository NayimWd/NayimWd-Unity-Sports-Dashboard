import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../component/layout/PageLayout";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { useGetMyTeamQuery, useUpdateTeamNameMutation } from "../../features/team/teamApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTeamNameSchema, updateTNameType } from "../../utils/schema/teamSchema";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import Buttons from "../../component/common/Buttons";
import { PenLine } from "lucide-react";
import PageHeader from "../../component/ui/PageHeader";

const UpdateTeamName = () => {
  const goBack = useGoBack();

  const { teamId } = useParams();

  const navigate = useNavigate();

  const { data: team } = useGetMyTeamQuery(teamId, { skip: !teamId });
  const [updateTeamName, { isLoading }] = useUpdateTeamNameMutation();


  // method 
  const method = useForm({
    resolver: zodResolver(updateTeamNameSchema),
    mode: "onSubmit",
  });



  const handleSubmit = async (data: updateTNameType) => {
    const loadingId = LoadingToast({ msg: "Updating Team Name..." });
    try {
      toast.dismiss(loadingId);
      await updateTeamName({
        teamId,
        teamName: data.teamName

      }).unwrap();
      SuccessToast({ msg: "Team Update successful" });
      method.reset();
      navigate(`/dashboard/team/manage/${teamId}`);

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Team name update failed!" })
    }
  }

  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="Blog details"
        title="Update blog name"
        subtitle="Pick a new name"
      />

      <div className=" w-full max-w-4xl mx-auto bg-surface  py-12 px-3 rounded-lg shadow">
        <FormContainer
          methods={method}
          onSubmit={handleSubmit}
          className=" w-full space-y-6 px-0 lg:px-5 rounded-lg">
          <TextInput name="teamName" label="Title" placeholder={team?.teamName ? team.teamName : ""} />
          <Buttons loading={isLoading} disabled={isLoading} iconRight={<PenLine size={16} />} variant="primary" className="w-full md:w-32 rounded">Update</Buttons>
        </FormContainer>
      </div>

    </PageLayout>
  )
}

export default UpdateTeamName;