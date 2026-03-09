import { ChevronLeft } from "lucide-react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router";

export default function AdminSectionDetailsLayout() {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="btn btn-ghost btn-sm">
            <ChevronLeft
              onClick={() => navigate(`/admin/courses/${id}/sections`)}
            />
          </button>
          <h2 className="ml-2 text-2xl font-semibold">
            Chương 1 - Linked List
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-info">Lưu</button>
          <button className="btn border-border bg-white">
            Chuyển sang Nháp
          </button>
          <button className="btn btn-error">Xoá</button>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-border mb-6">
        <NavLink
          to={"."}
          end
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Chi tiết
        </NavLink>
        <NavLink
          to={"lessons"}
          role="tab"
          end
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Danh sách bài học
        </NavLink>
        <NavLink
          to={"lessons/new"}
          role="tab"
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          Thêm bài học
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
