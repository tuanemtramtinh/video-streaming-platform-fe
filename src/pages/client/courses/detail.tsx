import { CourseDetailComment } from "@/components/CourseDetailComment";
import { CourseDetailDesc } from "@/components/CourseDetailDesc";
import { CourseDetailHeaderLeftColumn } from "@/components/CourseDetailHeaderLeftColumn";
import { CourseDetailHeaderRightColumn } from "@/components/CourseDetailHeaderRightColumn";
import { CourseDetailRating } from "@/components/CourseDetailRating";
import { CourseDetailSectionList } from "@/components/CourseDetailSectionList";
import { CourseDetailTeacher } from "@/components/CourseDetailTeacher";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CourseCardItem } from "@/components/CourseCardItem";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";
import { useParams } from "react-router";

export default function CourseDetailPage() {
  const { id } = useParams();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  // console.log(id);

  const { data } = useGetCourseDetail(id);

  // console.log(data);

  return (
    <div className="relative">
      <div className="bg-background py-10">
        <div className="container mx-auto flex gap-10">
          <div className="w-[65%]">
            <CourseDetailHeaderLeftColumn
              title={data?.title as string}
              author={`${data?.instructor.lastName} ${data?.instructor.firstName}`}
            />
          </div>
          <div className="w-[35%]">
            <CourseDetailHeaderRightColumn
              price={data?.price ?? 0}
              discount={data?.discount ?? 0}
              thumbnailUrl={
                data?.thumbnailUrl ??
                "https://placehold.co/600x400?text=Hello+World"
              }
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="flex items-start gap-10">
          <div className="w-[65%]">
            <div className="border-border flex gap-6 border-b pb-6">
              <button className="btn btn-soft btn-info">Mô tả</button>
              <button className="btn btn-soft btn-info">Giảng viên</button>
              <button className="btn btn-soft btn-info">Giáo trình</button>
              <button className="btn btn-soft btn-info">Đánh giá</button>
            </div>

            <CourseDetailDesc content={data?.description as string} />

            <CourseDetailTeacher
              author={`${data?.instructor.lastName} ${data?.instructor.firstName}`}
            />

            <div className="border-border border-b py-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-xl font-bold">Giáo trình</div>
                <div className="text-text-fourthdary text-sm">Xem tất cả</div>
              </div>

              <CourseDetailSectionList />
            </div>
          </div>
        </div>

        <div className="py-6">
          <h2 className="text-color-primary mb-6 text-xl font-semibold">
            Đánh giá học viên
          </h2>
          <div className="flex justify-between">
            <div className="flex-3">
              <CourseDetailRating />
            </div>

            <div className="flex-9">
              <CourseDetailComment />
              <button className="btn btn-outline mt-4 rounded-lg">
                Xem thêm đánh giá
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="text-color-primary mb-6 text-xl font-semibold">
            Các khoá học tương tự khác
          </h2>
          <div className="">
            <Slider {...settings}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="px-3">
                  <CourseCardItem />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
