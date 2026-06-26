import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignUpPage from "./pages/SignUpPage.tsx";
import LogInPage from "./pages/LogInPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter([
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/log-in", element: <LogInPage /> },
  {
    path: "*",
    element: (
      <PrivateRoute>
        <NotFoundPage />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
