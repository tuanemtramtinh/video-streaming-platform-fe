import { NavLink, Outlet, useParams } from "react-router";

export default function AdminCourseDetailsLayout() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Khoá học DSA</h2>

      <div role="tablist" className="tabs tabs-border mb-6">
        <NavLink
          to={id ? id : ""}
          end
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Chi tiết
        </NavLink>

        <NavLink
          to={id ? `${id}/sections` : ""}
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Danh sách chương
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
