import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import ErrorBoundaryWrapper from "./utils/ErrorWrapper.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import ThemeWrapper from "./utils/ThemeWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryWrapper>
      <Provider store={store}>
         <ThemeWrapper>
        <RouterProvider router={router}/>
        </ThemeWrapper>
      </Provider>
    </ErrorBoundaryWrapper>
  </StrictMode>
);
