import { User } from "lucide-react";
import Badge from "../../component/ui/Badge";

const MyProfile = () => {


  return (
    <div className="flex items-center gap-3 flex-wrap">
     <Badge icon={<User size={12}/>} variant="default"> default</Badge>
     <Badge variant="success">success</Badge>
     <Badge variant="warning">warning</Badge>
     <Badge variant="error">error</Badge>
     <Badge variant="outline">outline</Badge>
     <Badge variant="outline">ghost</Badge>
     <Badge variant="info">info</Badge>
    </div>
  )
}

export default MyProfile;