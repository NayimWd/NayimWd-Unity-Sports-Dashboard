import Dropdown from "../component/common/dropdown/Dropdown";
import PageLayout from "../component/layout/PageLayout";


const Dashboard = () => {

  return (
    <PageLayout>

      <h1 className="text-3xl font-bold text-font">Dashboard</h1>
      <Dropdown>
        <Dropdown.Trigger>More</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log("Pinned!")}>
            Pin
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Duplicated!")}>
            Duplicate
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </PageLayout>
  );
};

export default Dashboard;
