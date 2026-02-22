import HomePageImage from "@/assets/homepage.png";
import HomePageImage1 from "@/assets/homepage-1.png";
import HomePageImage2 from "@/assets/homepage-2.png";
import { CategoryCardItem } from "@/components/CategoryCardItem";
import { CourseCardItem } from "@/components/CourseCardItem";
import { Atom, Briefcase, CodeXml, MoveRight, Telescope } from "lucide-react";
import { TeacherCardItem } from "@/components/TeacherCardItem";

function HomePage() {
  return (
    <div className="container mx-auto">
      {/* Section1 */}
      <div className="flex items-center justify-between gap-30 py-10">
        <div className="flex-1">
          <h2 className="text-color-primary mb-4 text-[40px] font-bold">
            Khai phá tiềm năng của bạn với Byway
          </h2>
          <p className="text-text-secondary mb-6">
            Chào mừng bạn đến với Byway, nơi tri thức không ngừng mở rộng. Chúng
            tôi tin rằng giáo dục là nền tảng cho sự phát triển cá nhân và sự
            nghiệp, và chúng tôi ở đây để dẫn lối bạn đến thành công.
          </p>
          <button className="btn bg-text-fithdary rounded-lg text-white">
            Bắt đầu con đường giảng dạy
          </button>
        </div>
        <div className="flex-1">
          <img
            src={HomePageImage}
            alt="Byway"
            className="w-full object-contain"
          />
        </div>
      </div>
      {/* Section2 */}
      <div className="py-15">
        <div className="flex items-center justify-between">
          <h2 className="text-color-primary mb-6 text-2xl font-semibold">
            Danh mục nổi bật
          </h2>
          <div className="text-text-fithdary font-medium">Xem tất cả</div>
        </div>

        <div className="grid grid-cols-4 gap-7">
          <CategoryCardItem
            icon={<Telescope size={40} className="text-text-fithdary" />}
            title="Chiêm tinh học"
            count={11}
          />
          <CategoryCardItem
            icon={<CodeXml size={40} className="text-text-fithdary" />}
            title="Development"
            count={12}
          />
          <CategoryCardItem
            icon={<Briefcase size={40} className="text-text-fithdary" />}
            title="Marketing"
            count={12}
          />
          <CategoryCardItem
            icon={<Atom size={40} className="text-text-fithdary" />}
            title="Vật lý"
            count={14}
          />
        </div>
      </div>
      {/* Section3 */}
      <div className="pb-15">
        <div className="flex items-center justify-between">
          <h2 className="text-color-primary mb-6 text-2xl font-semibold">
            Khóa học nổi bật
          </h2>
          <div className="text-text-fithdary font-medium">Xem tất cả</div>
        </div>

        <div className="grid grid-cols-4 gap-7">
          <CourseCardItem />
          <CourseCardItem />
          <CourseCardItem />
          <CourseCardItem />
        </div>
      </div>
      {/* Section4 */}
      <div className="pb-15">
        <div className="flex items-center justify-between">
          <h2 className="text-color-primary mb-6 text-2xl font-semibold">
            Giảng viên nổi bật
          </h2>
          <div className="text-text-fithdary font-medium">Xem tất cả</div>
        </div>

        <div className="grid grid-cols-5 gap-14">
          <TeacherCardItem />
          <TeacherCardItem />
          <TeacherCardItem />
          <TeacherCardItem />
          <TeacherCardItem />
        </div>
      </div>
      {/* Section5 */}
      <div className="flex items-center gap-44 px-20 pb-15">
        <div className="flex-5">
          <img
            src={HomePageImage1}
            alt="Byway"
            className="w-full object-contain"
          />
        </div>
        <div className="flex-7">
          <h2 className="text-color-primary mb-2 text-xl font-semibold">
            Trở thành Giảng viên
          </h2>
          <p className="text-text-secondary mb-4">
            Các giảng viên từ khắp nơi trên thế giới đang giảng dạy cho hàng
            triệu học viên trên Byway. Chúng tôi cung cấp các công cụ và kỹ năng
            để bạn có thể dạy những gì mình yêu thích.
          </p>
          <button className="btn btn-neutral text-white">
            <span>Bắt đầu trở thành giảng viên</span>
            <MoveRight />
          </button>
        </div>
      </div>
      {/* Section6 */}
      <div className="flex items-center gap-44 px-20 pb-15">
        <div className="flex-7">
          <h2 className="text-color-primary mb-2 text-xl font-semibold">
            Thay đổi cuộc sống của bạn thông qua giáo dục
          </h2>
          <p className="text-text-secondary mb-4">
            Người học trên khắp thế giới đang bắt đầu những sự nghiệp mới, thăng
            tiến trong lĩnh vực của mình và làm phong phú thêm cuộc sống.
          </p>
          <button className="btn btn-neutral text-white">
            <span>Thanh toán các khóa học</span>
            <MoveRight />
          </button>
        </div>
        <div className="flex-5">
          <img
            src={HomePageImage2}
            alt="Byway"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
