import { useGetSectionById } from "@/hooks/useGetSectionById";
import { useSectionStore } from "@/stores/useSectionStore";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";

export default function AdminSectionDetailsLayout() {
  const { id, sectionId } = useParams();

  const section = useSectionStore((state) => state.section);

  const { data, isSuccess } = useGetSectionById(sectionId as string);

  const setSection = useSectionStore((state) => state.setSection);
  const clearSection = useSectionStore((state) => state.clearSection);

  useEffect(() => {
    if (data && isSuccess) {
      setSection(data);
    } else {
      clearSection();
    }
  }, [data, isSuccess, clearSection, setSection]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to={`/admin/courses/${id}/sections`}
            className="btn btn-ghost btn-sm"
          >
            <ChevronLeft />
          </Link>
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
