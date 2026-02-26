import { getCourseApi } from "@/services/courses.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCourse = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["courses", page, limit],
    queryFn: () => getCourseApi({ page, limit }),
    placeholderData: keepPreviousData,
  });
};
