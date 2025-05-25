// import { Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import UseAuthInit from "./pages/auth/UseAuthInit";
import { router } from "./routes/router";

function App() {
  UseAuthInit();
  return (
    <main className="overflow-x-hidden w-full h-screen  bg-bg">
      <RouterProvider router={router}/>
    </main>
  );
}

export default App;
