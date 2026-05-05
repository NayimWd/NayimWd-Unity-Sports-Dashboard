import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import ErrorBoundaryWrapper from "./utils/ErrorWrapper.tsx";
import ThemeWrapper from "./utils/ThemeWrapper.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./sentry.ts";
import * as Sentry from "@sentry/react";
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
    <ErrorBoundaryWrapper>
      <Provider store={store}>
        <ThemeWrapper>
          <App />
          <Toaster />
          <Analytics/>
        </ThemeWrapper>
      </Provider>
    </ErrorBoundaryWrapper>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
