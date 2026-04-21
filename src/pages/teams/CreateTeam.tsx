import { useNavigate } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import FormContainer from "../../component/common/Form/FormContainer";
import PhotoInput from "../../component/common/input/PhotoInputProps";
import TextInput from "../../component/common/input/TextInput";
import PageLayout from "../../component/layout/PageLayout"
import PageHeader from "../../component/ui/PageHeader";
import { useCreateTeamMutation } from "../../features/team/teamApi";
import { useGoBack } from "../../hooks/useGoBack";
import BackButton from "../../utils/BackButton";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { createTeamSchema, createTeamType } from "../../utils/schema/teamSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import SectionLayout from "../../component/layout/SectionLayout";

const CreateTeam = () => {
  const goBack = useGoBack();

  const navigate = useNavigate();
  const { data: user } = useCurrentUserQuery();
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  // form method
  const methods = useForm<createTeamType>({
    resolver: zodResolver(createTeamSchema),
    mode: "onSubmit"
  });

  const handleSubmit = async (data: createTeamType) => {
    const loadingId = LoadingToast({ msg: "Wait few momment! Creating...", duration: 12000 });
    try {
      const formData = new FormData();
      formData.append("managerId", user?._id ?? "")
      formData.append("teamName", data.teamName)
      if (data) {
        formData.append("teamLogo", data.teamLogo);
      };
      // update photo
      await createTeam(
        formData
      ).unwrap();
      toast.dismiss(loadingId);
      SuccessToast({ msg: "Team Creation Successfully" })
      methods.reset();
      navigate(`/dashboard/team/myTeam`)

    } catch (error) {
      toast.dismiss(loadingId);
      ErrorToast({ msg: "Team creation Failed!" })
    }
  };

  return (
    <PageLayout>
      <BackButton onClick={goBack}></BackButton>
      <PageHeader
        topTitle="Start your team"
        title="Create Team"
        subtitle="Enter Name & Logo"
      />
      <SectionLayout>
      <FormContainer
        methods={methods}
        onSubmit={handleSubmit}
        className=" max-w-5xl space-y-6 lg:px-10 overflow-x-hidden"
      >
        <TextInput name="teamName" label="Title" placeholder="Enter Team Name" />
        <PhotoInput label="Image" name="teamLogo" />
        <Buttons  className="rounded-md" loading={isLoading} iconRight={<Plus size={16} />} disabled={isLoading}>
          Create Team
        </Buttons>
      </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default CreateTeam;