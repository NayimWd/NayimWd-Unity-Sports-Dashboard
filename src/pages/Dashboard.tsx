import Buttons from "../component/common/Buttons";
import FormSkeleton from "../component/common/loader/FormSkeleton";
// import PageSkeleton from "../component/common/loader/PageSkeleton";
import PageLayout from "../component/layout/PageLayout";

const Dashboard = () => {

  return (
    <PageLayout>
      <Buttons variant="warning">button</Buttons>
        {/* <h1 className="text-3xl font-bold text-font">Dashboard</h1> */}
      <FormSkeleton/>
    
    </PageLayout>
  );
};

export default Dashboard;
