import { useNavigate } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useForm } from "react-hook-form";
import { PlayerProfileFormData, PlayerProfileSchema } from "../../utils/schema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import TextInput from "../../component/common/input/TextInput";
import Buttons from "../../component/common/Buttons";
import { Plus } from "lucide-react";
import DropdownInput from "../../component/common/input/DropdownInput";
import { batingStyle, bowlingArm, bowlingStyle, playerRole } from "./component/helper/helper";
import { useCreatePlayerProfileMutation } from "../../features/profile/profileSlice";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";

const CreatePlayerProfile = () => {
  const goBack = useGoBack();

  const navigate = useNavigate();
  const [createPlayerProfile, { isLoading }] = useCreatePlayerProfileMutation();

  // form method
  const methods = useForm<PlayerProfileFormData>({
    resolver: zodResolver(PlayerProfileSchema),
    mode: "onSubmit"
  });

 const handleSubmit = async (data: PlayerProfileFormData) => {
  const toastId = LoadingToast({ msg: "Wait a moment, creating..." });

  try {
    await createPlayerProfile({
      player_role: data.player_role,
      batingStyle: data.batingStyle,
      bowlingArm: data.bowlingArm,
      bowlingStyle: data.bowlingStyle,
      DateOfBirth: data.DateOfBirth,
    }).unwrap();

    toast.dismiss(toastId);
    SuccessToast({ msg: "Profile created successfully" });

    navigate("/dashboard/profile");
    methods.reset();

  } catch (error: any) {
    toast.dismiss(toastId);

    ErrorToast({
      msg: error?.data?.message || "Failed to create profile",
    });
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
          <DropdownInput
            label="Role"
            name="player_role"
            placeholder="Pick your role"
            options={playerRole}
          />
          <DropdownInput
            label="Bating style"
            name="batingStyle"
            placeholder="Pick your bating style"
            options={batingStyle}
          />
          <DropdownInput
            label="Bowling arm"
            name="bowlingArm"
            placeholder="Pick your Bowling arm"
            options={bowlingArm}
          />
          <DropdownInput
            label="Bowling style"
            name="bowlingStyle"
            placeholder="Pick your bowling style"
            options={bowlingStyle}
          />
          <TextInput name="DateOfBirth" label="Date of Birth" placeholder="DD-MM-YYYY" />
          <Buttons className="rounded-md" loading={isLoading} iconRight={<Plus size={16} />} disabled={isLoading}>
            Create Team
          </Buttons>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default CreatePlayerProfile;