import { CourseAdminGeneralInformation } from "@/components/CourseAdminGeneralInformation";

export default function AdminNewCoursePage() {
  return (
    <div>
      <h2 className="text-color-primary mb-4 text-2xl font-bold">
        Tạo khoá học mới
      </h2>
      <CourseAdminGeneralInformation isEdit={false} />
    </div>
  );
}
