import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   staleTime: 60 * 1000,
  // },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        style: {
          padding: "16px 24px",
          fontSize: "16px",
          maxWidth: "500px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-500)",
        },
      }}
    />
  </React.StrictMode>,
);
