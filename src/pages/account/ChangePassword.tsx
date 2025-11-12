import { z } from "zod"
import { PenLine } from "lucide-react"
import Buttons from "../../component/common/Buttons"
import FormContainer from "../../component/common/Form/FormContainer"
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils"
import { useChangePasswordMutation } from "../../features/account/accountApi"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePassordSchema } from "../../utils/schema/accountSchema"
import PasswordInput from "../../component/common/input/PasswordInput"
import { LoadingToast } from "../../utils/toastUtils"
import toast from "react-hot-toast"

type passType = z.infer<typeof changePassordSchema>;

const ChangePassword = () => {

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const navigate = useNavigate();

    const method = useForm<passType>({
        resolver: zodResolver(changePassordSchema),
        mode: "onSubmit"
    });

    const handleEdit = async (data: passType) => {
        const toastId = LoadingToast({ msg: "Updating Password..." });

        try {
            await changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }).unwrap();

            toast.dismiss(toastId);
            toast.success("Account Password updated");
            navigate("/dashboard/myAccount")

        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Failed to update account Password");
        }
    }

    return (
        <PageLayout>
            <BackButton onClick={useGoBack()}>Go Back</BackButton>
            <SectionLayout>
                <h1 className={`${fontStyle.pageTitle} text-font text-center`}>Change Password</h1>
                <div className="w-full flex justify-center">
                    <FormContainer
                        methods={method}
                        onSubmit={handleEdit}
                        className="w-full max-w-[768px] space-y-6 px-0 lg:px-5 rounded-lg"
                    >
                        <PasswordInput label="Old Password" name="oldPassword" placeholder="Enter Old Password" />
                        <PasswordInput label="New Password" name="newPassword" placeholder="Enter New Password" />
                        <Buttons className="rounded" iconLeft={<PenLine size={16} />} disabled={isLoading}>Change Password</Buttons>
                    </FormContainer>
                </div>
            </SectionLayout>
        </PageLayout>
    )
}

export default ChangePassword