
import FormSkeleton from "../component/common/loader/FormSkeleton";


import PageLayout from "../component/layout/PageLayout";

const Dashboard = () => {

  return (
    <PageLayout>

      {/* <h1 className="text-3xl font-bold text-font">Dashboard</h1> */}
      <FormSkeleton />

    </PageLayout>
  );
};

export default Dashboard;
