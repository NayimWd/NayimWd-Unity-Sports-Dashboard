import "./App.css";
// import Loader from "./component/common/loader/Loader";
import DashBoardLayout from "./component/layout/DashBoardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main className="overflow-x-hidden w-full h-screen bg-bg">
      <DashBoardLayout>
        <Dashboard />
      </DashBoardLayout>
      {/* <Loader/> */}
    </main>
  );
}

export default App;
