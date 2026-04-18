import { getSectionsByCourseIdApi } from "@/services/sections.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionsByCourseId = (
  courseId: number,
  page: number,
  limit: number,
  keyword?: string,
) => {
  return useQuery({
    queryKey: ["sections", courseId, page, limit, keyword],
    queryFn: () => getSectionsByCourseIdApi(courseId, page, limit, keyword),
  });
};
