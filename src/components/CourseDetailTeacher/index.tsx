import { Avatar } from "@/components/Avatar";
import { Badge, GraduationCap, Play } from "lucide-react";

export const CourseDetailTeacher = ({ author }: { author: string }) => {
  return (
    <div className="border-border border-b py-6">
      <div className="text-color-primary mb-4 text-xl font-semibold">
        Giảng viên
      </div>

      <div className="mb-4">
        <h2 className="text-text-fourthdary text-xl font-semibold">{author}</h2>
        <div className="text-text-secondary">Nhà thiết kế UI/UX</div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <Avatar width="w-30" />
        <ul className="flex flex-col gap-2">
          <li className="flex items-center">
            <Badge className="mr-1" />
            40,445 Đánh giá
          </li>
          <li className="flex items-center">
            <GraduationCap className="mr-1" />
            500 Học viên
          </li>
          <li className="flex items-center">
            <Play className="mr-1" />
            15 Khoá học
          </li>
        </ul>
      </div>

      <p className="text-text-secondary text-justify">
        Với hơn một thập kỷ kinh nghiệm trong ngành, Ronald mang đến cho lớp học
        một lượng kiến thức thực tiễn phong phú. Anh ấy đã đóng vai trò then
        chốt trong việc thiết kế giao diện lấy người dùng làm trung tâm cho các
        công ty công nghệ nổi tiếng, đảm bảo trải nghiệm người dùng liền mạch và
        hấp dẫn.
      </p>
    </div>
  );
};
