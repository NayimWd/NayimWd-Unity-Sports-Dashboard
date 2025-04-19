import BaseInput from "../component/input/BaseInput";
import { User } from "lucide-react";
import RegistrationForm from "./auth/Registration";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <BaseInput
        variant="primary"
        placeholder="User Name"
        icon={<User size={20} />}
      />
    <RegistrationForm/>
    </div>
  );
};

export default Dashboard;
