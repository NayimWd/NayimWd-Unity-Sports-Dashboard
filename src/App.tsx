import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { useAuthInit } from "./pages/auth/UseAuthInit";

function App() {
  useAuthInit();
  return (
    <main className="overflow-x-hidden w-full h-screen mx-auto  bg-bg">
      <RouterProvider router={router}/>
    </main>
  );
}

export default App;
