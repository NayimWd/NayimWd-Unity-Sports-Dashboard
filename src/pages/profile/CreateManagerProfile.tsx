import { Link } from "react-router-dom";
import Buttons from "../../component/common/Buttons";
import Card from "../../component/common/card/Card";
import PageLayout from "../../component/layout/PageLayout"
import PageHeader from "../../component/ui/PageHeader";
import { useGetManagerProfileQuery } from "../../features/profile/profileSlice";
import { useGoBack } from "../../hooks/useGoBack"
import BackButton from "../../utils/BackButton"
import { fontStyle } from "../../utils/ClassUtils";

const CreateManagerProfile = () => {
  const goBack = useGoBack();


  return (
    <PageLayout>
      <BackButton onClick={goBack}>Back</BackButton>
      <PageHeader
        topTitle="profile"
        title="Create Profile"
        subtitle="something meaningful"
      />
      
    </PageLayout>
  )
}

export default CreateManagerProfile;