import { ErrorToast, SuccessToast } from "../utils/toastUtils";
import Buttons from "../component/common/Buttons";


const Dashboard = () => {

  const handleSuccess = () => {
    SuccessToast({msg: "Green success", position: "bottom-center"});

  }
  const handleError = () => {
    ErrorToast({msg: "REd Error", position: "top-center"})
  }

  return (
    <div className="min-h-screen flex flex-col">
     
      <h1 className="text-3xl font-bold text-font">Dashboard</h1>
        <Buttons className="my-5" onClick={handleSuccess}>
            Success
        </Buttons>
        <Buttons onClick={handleError}>
            Error
        </Buttons>
    </div>
  );
};

export default Dashboard;
