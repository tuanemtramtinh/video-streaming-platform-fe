import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/client/home";
import LoginPage from "./pages/client/login";
import RegisterPage from "./pages/client/register";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/dashboard";
import AdminLoginPage from "./pages/admin/login";
import CoursePage from "./pages/client/courses";
import CourseDetailPage from "./pages/client/courses/detail";
import AdminCoursePage from "./pages/admin/courses";
import AdminNewCoursePage from "./pages/admin/courses/new";
import AdminEditCoursePage from "@/pages/admin/courses/details";
import AdminCourseDetailsLayout from "@/layouts/AdminCourseDetailsLayout";
import AdminCourseSectionPage from "@/pages/admin/courses/sections";
import AdminResourcesPage from "@/pages/admin/courses/resources";
import RequireAdminAuth from "@/layouts/RequireAdminAuth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "courses", Component: CoursePage },
      { path: "courses/:id", Component: CourseDetailPage },
    ],
  },
  {
    path: "/admin",
    Component: RequireAdminAuth,
    children: [
      {
        Component: AdminLayout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "login", Component: AdminLoginPage },
          {
            path: "courses",
            children: [
              { index: true, Component: AdminCoursePage },
              { path: "new", Component: AdminNewCoursePage },

              {
                path: ":id",
                Component: AdminCourseDetailsLayout,
                children: [
                  { index: true, Component: AdminEditCoursePage },
                  { path: "sections", Component: AdminCourseSectionPage },
                  { path: "resources", Component: AdminResourcesPage },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

//hello

export default router;
