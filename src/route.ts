import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage }
    ]
  }
])

export default router