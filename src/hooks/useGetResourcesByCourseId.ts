import { getResourcesByCourseIdApi } from "@/services/resources.service";
import { useQuery } from "@tanstack/react-query";

export const useGetResourcesByCourseId = (
  courseId: number,
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery({
    queryKey: ["resources", courseId, page, limit, keyword],
    queryFn: () => getResourcesByCourseIdApi(courseId, page, limit, keyword),
  });
};
