import { getCourseDetailApi } from "@/services/courses.service";
import type { ICourseDetail } from "@/types/course.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseDetail = (id?: string) => {
  return useQuery<ICourseDetail | undefined>({
    queryKey: ["courses", id],
    queryFn: () => getCourseDetailApi({ id: id! }),
    enabled: !!id,
  });
};
