import { getResourcesByCourseIdApi } from "@/services/resources.service";
import { useQuery } from "@tanstack/react-query";

export const useGetResourcesByCourseId = (
  courseId: number,
  page: number,
  limit: number,
) => {
  return useQuery({
    queryKey: ["resources", courseId, page, limit],
    queryFn: () => getResourcesByCourseIdApi(courseId, page, limit),
  });
};
