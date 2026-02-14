import { CourseFilter } from "../../../components/CourseFilter";
import { CourseLeftColumn } from "../../../components/CourseLeftColumn";
import { CourseRightColumn } from "../../../components/CourseRightColumn";

export default function CoursePage() {
  return (
    <div className="py-[60px]">
      <div className="mb-6">
        <div className="text-color-primary mb-6 text-[40px] font-bold">
          Khoá học
        </div>
        <div className="text-color-primary text-2xl font-semibold">
          Tất cả khoá học
        </div>
      </div>

      <CourseFilter />
      <div className="flex gap-10">
        <div className="flex-1">
          <CourseLeftColumn />
        </div>

        <div className="flex-4">
          <CourseRightColumn />
        </div>
      </div>
    </div>
  );
}
