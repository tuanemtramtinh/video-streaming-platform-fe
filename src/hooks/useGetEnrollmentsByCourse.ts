import { getEnrollmentsByCourseApi } from "@/services/courses.service";
import type { IEnrollmentResponse } from "@/types/enrollment.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetEnrollmentsByCourse = (
  courseId: string | number,
  page: number,
  limit: number,
) => {
  return useQuery<IEnrollmentResponse | undefined>({
    queryKey: ["enrollments", courseId, page, limit],
    queryFn: () => getEnrollmentsByCourseApi({ courseId, page, limit }),
    placeholderData: keepPreviousData,
    enabled: !!courseId,
  });
};
