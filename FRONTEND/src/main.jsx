import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes/routeTree.js";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastMessageContainer } from "./components/toastMessage.jsx";

export const queryClient = new QueryClient()
const router = createRouter({ routeTree,context: { store,queryClient } });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastMessageContainer />
    </QueryClientProvider>
  </Provider>
);
