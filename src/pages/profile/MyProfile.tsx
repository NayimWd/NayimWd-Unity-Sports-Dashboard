import { User } from "lucide-react";
import Badge from "../../component/ui/Badge";
import SectionLayout from "../../component/layout/SectionLayout";
import PageLayout from "../../component/layout/PageLayout";
import BackButton from "../../utils/BackButton";

const MyProfile = () => {

  return (
    <PageLayout>
      <BackButton link="/dashboard">Go Home</BackButton>
      <div className="flex items-center gap-3 flex-wrap">
      <Badge icon={<User size={12} />} variant="default"> default</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="error">error</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="outline">ghost</Badge>
      <Badge variant="info">info</Badge>
</div>
     <SectionLayout>
      Profile
     </SectionLayout>
    </PageLayout>
  )
}

export default MyProfile;