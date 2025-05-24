import { useSelector } from "react-redux";
import { RootState } from "../app/store/store"; // Adjust the path to where your store is defined


const Dashboard = () => {

  const user = useSelector((state: RootState) => state.auth)

  console.log(user)

  return (
    <div className="min-h-screen flex flex-col">

      <h1 className="text-3xl font-bold text-font">Dashboard</h1>

    </div>
  );
};

export default Dashboard;
