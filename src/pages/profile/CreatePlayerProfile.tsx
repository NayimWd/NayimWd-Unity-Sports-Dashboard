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
import { playerRole } from "./component/helper/helper";
import { useCreatePlayerProfileMutation } from "../../features/profile/profileSlice";
import { LoadingToast } from "../../utils/toastUtils";

const CreatePlayerProfile = () => {
    const goBack = useGoBack();
  
    const navigate = useNavigate();
    const { data: user } = useCurrentUserQuery();
  
    const [createPlayerProfile, {isLoading}] = useCreatePlayerProfileMutation();
  
    // form method
    const methods = useForm<PlayerProfileFormData>({
      resolver: zodResolver(PlayerProfileSchema),
      mode: "onSubmit"
    });

    const handleSubmit = (data: PlayerProfileFormData) => {
      const toastId = LoadingToast({msg: "Wait a momment, Creating..."});
      console.log(data)
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
                options={playerRole}
              />
        <DropdownInput
                label="Bowling arm"
                name="bowlingArm"
                placeholder="Pick your Bowling arm"
                options={playerRole}
              />
        <DropdownInput
                label="Bowling style"
                name="bowlingStyle"
                placeholder="Pick your bowling style"
                options={playerRole}
              />
        <TextInput name="DateOfBirth" label="Date of Birth" placeholder="Enter Date of birth" />
        <Buttons  className="rounded-md" loading={isLoading} iconRight={<Plus size={16} />} disabled={isLoading}>
          Create Team
        </Buttons>
      </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default CreatePlayerProfile;