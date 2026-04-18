import { getCourseByInstructorIdApi } from "@/services/courses.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCourseByInstructor = (
  id: string,
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery({
    queryKey: ["courses", id, page, limit, keyword],
    queryFn: () =>
      getCourseByInstructorIdApi({ instructorId: id, page, limit, keyword }),
    placeholderData: keepPreviousData,
  });
};
