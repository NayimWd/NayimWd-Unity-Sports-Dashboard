import "./App.css";
import DashBoardLayout from "./component/layout/DashBoardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <main className="overflow-x-hidden w-full h-screen bg-bg">
      <DashBoardLayout>
        <Dashboard />
      </DashBoardLayout>
    </main>
  );
}

export default App;
