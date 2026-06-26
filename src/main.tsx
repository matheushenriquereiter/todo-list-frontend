import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignUpPage from "./pages/SignUpPage.tsx";
import LogInPage from "./pages/LogInPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import HomePage from "./pages/HomePage.tsx";
import AnonymousRoute from "./components/AnonymousRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: (
      <AnonymousRoute>
        <SignUpPage />
      </AnonymousRoute>
    ),
  },
  {
    path: "/log-in",
    element: (
      <AnonymousRoute>
        <LogInPage />
      </AnonymousRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage></HomePage>
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
