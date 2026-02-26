import { NavLink, Outlet } from "react-router";

export default function AdminCourseDetailsLayout() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Khoá học DSA</h2>

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
