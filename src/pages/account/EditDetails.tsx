import { useForm } from "react-hook-form"
import { z } from "zod";
import FormContainer from "../../component/common/Form/FormContainer"
import TextInput from "../../component/common/input/TextInput"
import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils"
import Buttons from "../../component/common/Buttons"
import { PenLine } from "lucide-react"
import { accountUpdateSchema } from "../../utils/schema/accountSchema";
import { useCurrentUserQuery } from "../../features/auth/authApi";
import { useEditAccountDetailsMutation } from "../../features/account/accountApi";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



type detailsType = z.infer<typeof accountUpdateSchema>


const EditDetails = () => {
  //get current user 
  const { data: user } = useCurrentUserQuery();

  const [editAccountDetails, { isLoading }] = useEditAccountDetailsMutation();

  const navigate = useNavigate();

  const method = useForm<detailsType>({
    resolver: zodResolver(accountUpdateSchema),
    mode: "onSubmit"
  });

  useEffect(() => {
    if (user) {
      method.reset({
        name: user.name ?? "",
        phoneNumber: user.phoneNumber ?? ""
      })
    }
  }, [user])

  const handleEdit = async (data: detailsType) => {
    const toastId = LoadingToast({ msg: "Updating Account Details..." });
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);

      await editAccountDetails({
        name: data.name,
        phoneNumber: data.phoneNumber,
      }).unwrap();

      toast.dismiss(toastId);
      toast.success("Account details updated");
      navigate("/dashboard/myAccount")
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to update account details");
    }
  }

  return (
    <PageLayout>
      <BackButton onClick={useGoBack()}>Go Back</BackButton>
      <SectionLayout>
        <h1 className={`${fontStyle.pageTitle} text-font text-center`}>Edit Account Information</h1>
        <div className="w-full flex justify-center">
          <FormContainer
            methods={method}
            onSubmit={handleEdit}
            className="w-full max-w-[768px] space-y-6 px-0 lg:px-5 rounded-lg"
          >
            <TextInput label="Edit Name" name="name" placeholder="Edit Name" defaultValue={user?.name} />
            <TextInput label="Phone Number" name="phoneNumber" placeholder="Edit Phone Number" defaultValue={user?.phoneNumber} />
            <Buttons iconLeft={<PenLine size={16} />} disabled={isLoading}>Update</Buttons>
          </FormContainer>
        </div>
      </SectionLayout>
    </PageLayout>
  )
}

export default EditDetails;