import { useCourseStore } from "@/stores/useCourseStore";
import { NavLink, Outlet } from "react-router";

export default function AdminCourseDetailsLayout() {
  const currentCourse = useCourseStore((state) => state.currentCourse);

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-semibold">
        {currentCourse ? currentCourse.title : "Loading..."}
      </h2>

      <div role="tablist" className="tabs tabs-border mb-6">
        <NavLink
          to={""}
          end
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Chi tiết
        </NavLink>

        <NavLink
          to={"sections"}
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Danh sách chương
        </NavLink>

        <NavLink
          to={"resources"}
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Tài liệu
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
