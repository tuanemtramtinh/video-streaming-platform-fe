import { CourseDetailHeaderLeftColumn } from "@/components/CourseDetailHeaderLeftColumn";
import { CourseDetailHeaderRightColumn } from "@/components/CourseDetailHeaderRightColumn";

export default function CourseDetailPage() {
  return (
    <div className="">
      <div className="bg-background py-10">
        <div className="container mx-auto flex gap-10">
          <div className="w-[65%]">
            <CourseDetailHeaderLeftColumn />
          </div>
          <div className="w-[35%]">
            <CourseDetailHeaderRightColumn />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="border-border flex gap-6 border-b pb-6">
          <button className="btn btn-soft btn-info">Mô tả</button>
          <button className="btn btn-soft btn-info">Giảng viên</button>
          <button className="btn btn-soft btn-info">Giáo trình</button>
          <button className="btn btn-soft btn-info">Đánh giá</button>
        </div>
      </div>
    </div>
  );
}
