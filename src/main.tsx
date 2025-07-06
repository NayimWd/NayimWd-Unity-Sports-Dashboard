import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import ErrorBoundaryWrapper from "./utils/ErrorWrapper.tsx";
import ThemeWrapper from "./utils/ThemeWrapper.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryWrapper>
      <Provider store={store}>
        <ThemeWrapper>
          <App />
          <Toaster />
        </ThemeWrapper>
      </Provider>
    </ErrorBoundaryWrapper>
  </StrictMode>
);
