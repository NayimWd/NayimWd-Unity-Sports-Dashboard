import { Outlet } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <main className="overflow-x-hidden w-full h-screen  bg-bg">
      
      <Outlet />
    </main>
  );
}

export default App;
