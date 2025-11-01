import PageLayout from "../../component/layout/PageLayout"
import SectionLayout from "../../component/layout/SectionLayout"
import { fontStyle } from "../../utils/ClassUtils"

const ProfileDetails = () => {
  return (
    <PageLayout>
      <h1 className={`${fontStyle.pageTitle}`}>My Profile</h1>
      <SectionLayout>
        Edit
      </SectionLayout>
    </PageLayout>
  )
}

export default ProfileDetails