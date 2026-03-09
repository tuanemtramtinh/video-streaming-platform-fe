import { useSectionStore } from "@/stores/useSectionStore";
import { ChevronLeft } from "lucide-react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router";

export default function AdminSectionDetailsLayout() {
  const navigate = useNavigate();

  const { id } = useParams();

  const section = useSectionStore((state) => state.section);

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
            {section
              ? `Chương ${section.orderIndex} - ${section.title}`
              : "Loading..."}
          </h2>
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
