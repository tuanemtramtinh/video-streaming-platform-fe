import { CourseCardItem } from "@/components/CourseCardItem";
import { CourseLeftColumn } from "@/components/CourseLeftColumn";
import Pagination from "@/components/Pagination";
import { useGetEnrolledCourses } from "@/hooks/useGetEnrolledCourses";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

export default function MyCoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;

  const { data, isSuccess } = useGetEnrolledCourses(pageFromUrl, limit);

  const handleChangePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
  };

  const lastPage = data?.meta?.lastPage ?? 1;

  console.log(lastPage);

  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold">Khoá học của tôi</h2>
          <div>
            Chào mừng bạn trở lại, hãy tiếp tục hành trình học tập của mình
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex-1">
            <CourseLeftColumn />
          </div>

          <div className="flex-4">
            <label className="input mb-6 w-full">
              <Search />
              <input type="search" className="grow" placeholder="Search" />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>

            <div className="grid grid-cols-3 gap-5">
              {isSuccess &&
                data?.data.map((course) => (
                  <CourseCardItem
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    thumbnailUrl={course.thumbnailUrl}
                    author={`${course.instructor.lastName} ${course.instructor.firstName}`}
                    price={course.price}
                    discount={course.discount}
                    isBought={true}
                  />
                ))}
            </div>

            <div className="flex w-full justify-center">
              <Pagination
                currentPage={pageFromUrl}
                lastPage={lastPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
