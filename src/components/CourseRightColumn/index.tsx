import { useGetCourse } from "@/hooks/useGetCourse";
import { CourseCardItem } from "../CourseCardItem";
import { useSearchParams } from "react-router";
import Pagination from "@/components/Pagination";
import { CourseCardItemSkeleton } from "@/components/Skeletons/CourseCardItemSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";

export const CourseRightColumn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;

  const { data, isPending } = useGetCourse(pageFromUrl, limit);

  const handleChangePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
  };

  const lastPage = data?.meta?.lastPage ?? 1;

  return (
    <div className="">
      <div className="mb-6 grid grid-cols-3 gap-5">
        {isPending ? (
          Array.from({ length: limit }, (_, i) => (
            <CourseCardItemSkeleton key={i} />
          ))
        ) : data?.data?.length ? (
          data.data.map((course) => (
            <CourseCardItem
              key={course.id}
              id={course.id}
              title={course.title}
              author={`${course.instructor.lastName} ${course.instructor.firstName}`}
              price={course.price}
              discount={course.discount}
              thumbnailUrl={course.thumbnailUrl}
              isBought={
                course.isEnrolled || course.instructorId === Number(user?.id)
              }
            />
          ))
        ) : (
          <div className="text-text-secondary col-span-3 py-8 text-center">
            Chưa có khoá học nào
          </div>
        )}
      </div>

      <div className="flex w-full justify-center">
        <Pagination
          currentPage={pageFromUrl}
          lastPage={lastPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};
