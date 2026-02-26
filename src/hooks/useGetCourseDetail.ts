import { getCourseDetailApi } from "@/services/courses.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseDetail = (id?: string) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => getCourseDetailApi({ id: id! }),
    enabled: !!id,
  });
};
