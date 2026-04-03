import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";
import { useCourseStore } from "@/stores/useCourseStore";
import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router";

export default function AdminCourseDetailsLayout() {
  const { id } = useParams();

  const { data, isSuccess } = useGetCourseDetail(id);

  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const clearCurrentCourse = useCourseStore(
    (state) => state.clearCurrentCourse,
  );

  useEffect(() => {
    if (data && isSuccess) {
      setCurrentCourse(data);
    } else {
      clearCurrentCourse();
    }
  }, [data, isSuccess, clearCurrentCourse, setCurrentCourse]);

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-semibold">
        {data ? data.title : "Loading..."}
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
