import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/client/home";
import LoginPage from "./pages/client/login";
import RegisterPage from "./pages/client/register";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: DashboardPage }
    ]
  }
])

export default router