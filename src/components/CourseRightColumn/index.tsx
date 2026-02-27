import { useGetCourse } from "@/hooks/useGetCourse";
import { CourseCardItem } from "../CourseCardItem";
import { useSearchParams } from "react-router";
import Pagination from "@/components/Pagination";

export const CourseRightColumn = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;

  const { data, isLoading } = useGetCourse(pageFromUrl, limit);

  console.log(data);

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
        {data?.data.map((course) => (
          <CourseCardItem
            key={course.id}
            id={course.id}
            title={course.title}
            author={`${course.instructor.lastName} ${course.instructor.firstName}`}
            price={`${course.price.toLocaleString()} VND`}
            thumbnailUrl={course.thumbnailUrl}
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
  );
};
