import { getEnrolledCoursesApi } from "@/services/courses.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetEnrolledCourses = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["courses", "enrolled", page, limit],
    queryFn: () => getEnrolledCoursesApi({ page, limit }),
    placeholderData: keepPreviousData,
  });
};
