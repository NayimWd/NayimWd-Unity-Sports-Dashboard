import { useNavigate, useParams } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import { useGetPlayerProfileQuery, useUpdatePlayerProfileMutation } from "../../features/profile/profileSlice";
import { UpdatePlayerProfileFormData, updatePlayerProfileSchema } from "../../utils/schema/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import Buttons from "../../component/common/Buttons";
import { Plus } from "lucide-react";
import DropdownInput from "../../component/common/input/DropdownInput";
import { batingStyle, bowlingArm, bowlingStyle, playerRole } from "./component/helper/helper";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { useEffect } from "react";



const EditPlayerProfile = () => {
    const goBack = useGoBack();
    const { playerId } = useParams();
    const navigate = useNavigate();

    const [updatePlayerProfile, { isLoading }] = useUpdatePlayerProfileMutation();
    const { data: player } = useGetPlayerProfileQuery(playerId);

    // set default value for from 
    useEffect(() => {
        if (player) {
            methods.reset({
                player_role: player.player_role,
                batingStyle: player.batingStyle,
                bowlingArm: player.bowlingArm,
                bowlingStyle: player.bowlingStyle,
            })
        }
    }, [player])


    // form method
    const methods = useForm<UpdatePlayerProfileFormData>({
        resolver: zodResolver(updatePlayerProfileSchema),
        mode: "onSubmit"
    });

    const handleSubmit = async (data: UpdatePlayerProfileFormData) => {
        const toastId = LoadingToast({ msg: "Wait a moment, updating..." });

        try {
           
            await updatePlayerProfile(
                data
            ).unwrap();

            toast.dismiss(toastId);
            SuccessToast({ msg: "Profile updated successfully" });

            navigate("/dashboard/profile");
            methods.reset();

        } catch (error: any) {
            toast.dismiss(toastId);

            ErrorToast({
                msg: error?.data?.message || "Failed to update profile",
            });
        }
    };

    return (
        <PageLayout>
            <BackButton onClick={goBack}></BackButton>
            <PageHeader
                topTitle="Profile"
                title="Create your profile"
                subtitle="Enter information"
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
                    <Buttons className="rounded-md" loading={isLoading} iconRight={<Plus size={16} />} disabled={isLoading}>
                        Update Profile
                    </Buttons>
                </FormContainer>
            </SectionLayout>
        </PageLayout>
    )
}

export default EditPlayerProfile;