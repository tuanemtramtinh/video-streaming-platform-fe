import { getCourseByInstructorIdApi } from "@/services/courses.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCourseByInstructor = (
  id: string,
  page: number,
  limit: number,
) => {
  return useQuery({
    queryKey: ["courses", id, page, limit],
    queryFn: () =>
      getCourseByInstructorIdApi({ instructorId: id, page, limit }),
    placeholderData: keepPreviousData,
  });
};
