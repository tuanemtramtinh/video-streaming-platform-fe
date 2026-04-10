import { createBrowserRouter } from "react-router";

import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import RequireAdminAuth from "@/layouts/RequireAdminAuth";

import HomePage from "./pages/client/home";
import LoginPage from "./pages/client/login";
import RegisterPage from "./pages/client/register";
import CoursePage from "./pages/client/courses";
import CourseDetailPage from "./pages/client/courses/detail";

import DashboardPage from "./pages/admin/dashboard";
import AdminLoginPage from "./pages/admin/login";

import AdminCoursePage from "./pages/admin/courses";
import AdminNewCoursePage from "./pages/admin/courses/new";

import AdminCourseDetailsLayout from "@/layouts/AdminCourseDetailsLayout";
import AdminEditCoursePage from "@/pages/admin/courses/details";
import AdminResourcesPage from "@/pages/admin/courses/resources";
import AdminCourseEnrollmentsPage from "@/pages/admin/courses/enrollments";

import AdminCourseSectionPage from "@/pages/admin/courses/sections";
import AdminCourseSectionDetailsPage from "@/pages/admin/courses/sections/details";
import AdminSectionDetailsLayout from "@/layouts/AdminSectionDetailsLayout";
import AdminLessonsPage from "./pages/admin/courses/lessons";
import AdminNewLessonPage from "./pages/admin/courses/lessons/new";
import AdminLessonDetailPage from "./pages/admin/courses/lessons/details";
import SectionsPage from "./pages/client/sections/details";
import MyCoursesPage from "./pages/client/courses/my-courses";
import PaymentReturnPage from "./pages/client/payments/return";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      {
        path: "my-courses",
        Component: MyCoursesPage,
      },
      {
        path: "payments/return",
        Component: PaymentReturnPage,
      },
      {
        path: "courses",
        children: [
          { index: true, Component: CoursePage },
          {
            path: ":id",
            Component: CourseDetailPage,
          },
          {
            path: ":id/sections/:sectionId/lessons/:lessonId",
            Component: SectionsPage,
          },
        ],
      },
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
          { path: "dashboard", Component: DashboardPage },
          { path: "login", Component: AdminLoginPage },

          {
            path: "courses",
            children: [
              { index: true, Component: AdminCoursePage },
              { path: "new", Component: AdminNewCoursePage },

              // course layout
              {
                path: ":id",
                Component: AdminCourseDetailsLayout,
                children: [
                  { index: true, Component: AdminEditCoursePage },
                  { path: "resources", Component: AdminResourcesPage },
                  { path: "sections", Component: AdminCourseSectionPage },
                  { path: "enrollments", Component: AdminCourseEnrollmentsPage },
                ],
              },

              // SECTION layout riêng
              {
                path: ":id/sections/:sectionId",
                Component: AdminSectionDetailsLayout,
                children: [
                  {
                    index: true,
                    Component: AdminCourseSectionDetailsPage,
                  },
                  {
                    path: "lessons",
                    children: [
                      { index: true, Component: AdminLessonsPage },
                      { path: "new", Component: AdminNewLessonPage },
                      { path: ":lessonId", Component: AdminLessonDetailPage },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
