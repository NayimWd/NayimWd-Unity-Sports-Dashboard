import { useNavigate } from "react-router-dom";
import { useGoBack } from "../../hooks/useGoBack";
import { useForm } from "react-hook-form";
import {  useGetUmpireProfileQuery, useUpdateUmpireProfileMutation } from "../../features/profile/profileSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";
import PageHeader from "../../component/ui/PageHeader";
import SectionLayout from "../../component/layout/SectionLayout";
import FormContainer from "../../component/common/Form/FormContainer";
import DropdownInput from "../../component/common/input/DropdownInput";
import Buttons from "../../component/common/Buttons";
import { Plus } from "lucide-react";
import { ErrorToast, LoadingToast, SuccessToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { createUmpireProfileData, createUmpireProfileSchema } from "../../utils/schema/profileSchema";
import {  experiences } from "./component/helper/helper";
import { useEffect } from "react";

const UpdateUmpireProfile = () => {

    const goBack = useGoBack();
    
      const navigate = useNavigate();
      const [updateUmpireProfile, { isLoading }] = useUpdateUmpireProfileMutation();
      const {data} = useGetUmpireProfileQuery(undefined);

      useEffect(()=> {
        if(data?.yearsOfExperience){
          methods.reset({
            yearsOfExperience: data.yearsOfExperience,
          })
        }
      },[data])
    
      // form method
      const methods = useForm<createUmpireProfileData>({
        resolver: zodResolver(createUmpireProfileSchema),
        mode: "onSubmit"
      });
    
      const handleSubmit = async (data: createUmpireProfileData) => {
        const toastId = LoadingToast({ msg: "Wait a moment, updating..." });
    
        try {
          await updateUmpireProfile(
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
        topTitle="profile"
        title="Update your profile"
        subtitle="Enter year of experience"
      />
      <SectionLayout>
        <FormContainer
          methods={methods}
          onSubmit={handleSubmit}
          className=" max-w-4xl space-y-6 lg:px-10 overflow-x-hidden"
        >
          <DropdownInput
            label="Experience"
            name="yearsOfExperience"
            placeholder="Pick your Experience"
            options={experiences}
          />

          <Buttons className="rounded-md" loading={isLoading} iconRight={<Plus size={16} />} disabled={isLoading}>
            Update profile
          </Buttons>
        </FormContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default UpdateUmpireProfile