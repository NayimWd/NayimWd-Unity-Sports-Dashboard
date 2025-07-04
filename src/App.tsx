import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { UseAuthInit } from "./pages/auth/UseAuthInit";

function App() {
  UseAuthInit();
  return (
    <main className="overflow-x-hidden w-full h-screen  bg-bg">
      <RouterProvider router={router}/>
    </main>
  );
}

export default App;
