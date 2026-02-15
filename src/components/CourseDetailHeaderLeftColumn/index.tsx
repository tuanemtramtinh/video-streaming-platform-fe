import { Rating } from "../Rating";

export const CourseDetailHeaderLeftColumn = () => {
  return (
    <div className="">
      <div className="breadcrumbs mb-10 text-sm">
        <ul>
          <li>Trang chủ</li>
          <li>Khoá học</li>
          <li>Giới thiệu về Thiết kế trải nghiệm người dùng</li>
        </ul>
      </div>

      <h2 className="mb-5 text-[40px] font-bold">
        Giới thiệu về Thiết kế trải nghiệm người dùng
      </h2>
      <p className="mb-6">
        Khóa học này được thiết kế tỉ mỉ nhằm cung cấp cho bạn nền tảng kiến
        thức về các nguyên tắc, phương pháp luận và công cụ tạo nên trải nghiệm
        người dùng xuất sắc trong môi trường kỹ thuật số.
      </p>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center">
          <Rating rating={5} />
          <div>(651651 Đánh giá)</div>
        </div>
        <span>|</span>
        <span> 22 giờ · 155 bài · Cơ bản</span>
      </div>

      <div>
        <div className="avatar mr-2">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <span>
          Tạo bởi <span className="text-info">Ronal Richards</span>
        </span>
      </div>
    </div>
  );
};
