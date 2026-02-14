import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/client/home";
import LoginPage from "./pages/client/login";
import RegisterPage from "./pages/client/register";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/dashboard";
import AdminLoginPage from "./pages/admin/login";
import CoursePage from "./pages/client/courses";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      { path: "/courses", Component: CoursePage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "login", Component: AdminLoginPage },
    ],
  },
]);

//hello

export default router;
