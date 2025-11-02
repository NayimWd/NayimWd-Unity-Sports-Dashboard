import SectionLayout from "../../component/layout/SectionLayout";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";

const MyProfile = () => {

  return (
    <PageLayout>
      <BackButton link="/dashboard">Go Home</BackButton>
     <SectionLayout>
      Profile
     </SectionLayout>
    </PageLayout>
  )
}

export default MyProfile;